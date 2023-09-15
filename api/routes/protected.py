from flask import Blueprint, jsonify, current_app, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
    decode_token,
)
from database.db_client import revoke_tokens, check_for_revoked_tokens

protected_routes = Blueprint("protected", __name__)


@protected_routes.route("refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    token = request.headers.get("Authorization").split(" ")[1]

    decoded_token_jti = decode_token(token)["jti"]

    is_revoked, _ = check_for_revoked_tokens(current_app, decoded_token_jti)

    if is_revoked:
        return jsonify({"msg": "Token has been revoked"}), 401

    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_token), 200


@protected_routes.route("protected", methods=["GET"])
def protected():
    return jsonify({"msg": "You have access to this resource"})


@protected_routes.route("/logout", methods=["POST"])
def logout():
    access_token = request.headers.get("Authorization").split(" ")[1]
    refresh_token = request.headers.get("X-REFRESH-TOKEN")

    if not access_token or not refresh_token:
        return (
            jsonify(
                {
                    "msg": "Access token (Authorization header) and refresh token (X-Refresh-Token) are required"
                }
            ),
            400,
        )

    current_user_id = get_jwt_identity()

    try:
        decoded_access_token = decode_token(access_token)
        decoded_refresh_token = decode_token(refresh_token)
        access_jti = decoded_access_token.get("jti")
        refresh_jti = decoded_refresh_token.get("jti")
        access_user_id = decoded_access_token.get("sub")
        refresh_user_id = decoded_refresh_token.get("sub")
    except Exception as e:
        return (
            jsonify(
                {"msg": "An error occurred during decoding tokens", "error": str(e)}
            ),
            400,
        )

    # Check if tokens belong to the logged-in user
    if current_user_id != access_user_id or current_user_id != refresh_user_id:
        return jsonify({"msg": "Token user mismatch"}), 400

    success, msg = revoke_tokens(current_app, access_jti, refresh_jti)

    if success:
        return jsonify({"msg": "Successfully logged out"}), 200
    else:
        return jsonify({"msg": "Logout failed", "error": msg}), 400
