from flask_jwt_extended import JWTManager, decode_token
from flask import request, current_app, jsonify
from flask_jwt_extended import verify_jwt_in_request

from database.db_client import check_for_revoked_tokens


def init_jwt(app):
    JWTManager(app)

    def verify_protected_routes():
        exclude_paths = ["/api/refresh"]

        if request.path.startswith("/api") and request.path not in exclude_paths:
            verify_jwt_in_request()

            token_jti = decode_token(
                request.headers.get("Authorization").split(" ")[-1]
            )["jti"]
            is_revoked, _ = check_for_revoked_tokens(current_app, token_jti)

            if is_revoked:
                return jsonify({"msg": "Token has been revoked"}), 401

    app.before_request(verify_protected_routes)
