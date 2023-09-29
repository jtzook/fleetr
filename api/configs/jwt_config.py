from flask_jwt_extended import JWTManager, decode_token
from flask import request, current_app, jsonify
from database.db_client import check_for_revoked_tokens, revoke_token


def init_jwt(app):
    JWTManager(app)

    def verify_protected_routes():
        if request.path.startswith("/api"):
            tokens = {
                "access_token": request.cookies.get("access_token"),
                "refresh_token": request.cookies.get("refresh_token"),
                "csrf_token": request.cookies.get("csrf_token"),
            }

            try:
                for token_name, token_value in tokens.items():
                    if token_value:
                        decoded_token = decode_token(token_value)
                        token_jti = decoded_token["jti"]

                        is_revoked, _ = check_for_revoked_tokens(current_app, token_jti)
                        if is_revoked:
                            return (
                                jsonify({"msg": f"{token_name} has been revoked"}),
                                401,
                            )

                        # revoke all tokens on refresh
                        if request.path.startswith("/api/refresh"):
                            revoke_token(app, token_jti)
                    else:
                        return (
                            jsonify({"msg": "Token(s) are missing from request"}),
                            401,
                        )

                return  # all good

            except Exception:
                return jsonify({"msg": "JWT verification failed"}), 401

    app.before_request(verify_protected_routes)
