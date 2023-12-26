from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    decode_token,
)
from database.db_client import revoke_token, check_for_revoked_tokens

protected_routes = Blueprint("protected", __name__)


@protected_routes.route("refresh", methods=["POST"])
def refresh():
    try:
        existing_refresh_token = request.cookies.get("refresh_token")
        decoded_token = decode_token(existing_refresh_token)
        user_id = decoded_token["sub"]

        new_access_token = create_access_token(identity=user_id)
        new_refresh_token = create_refresh_token(identity=user_id)
        new_csrf_token = "new_csrf_token_here"

        response = jsonify({"msg": "Refreshed"})
        response.set_cookie(
            "access_token",
            new_access_token,
            httponly=True,
            secure=True,
            samesite="Strict",
        )
        response.set_cookie(
            "refresh_token",
            new_refresh_token,
            httponly=True,
            secure=True,
            samesite="Strict",
        )
        response.set_cookie(
            "csrf_token", new_csrf_token, httponly=False, secure=True, samesite="Strict"
        )

        return response, 200

    except Exception:
        return jsonify({"msg": "Could not refresh tokens"}), 401


@protected_routes.route("/protected", methods=["GET"])
def protected():
    return jsonify({"msg": "You have access to this resource"})


# @protected_routes.route("/logout", methods=["POST"])
# def logout():
#     access_token = request.headers.get("Authorization").split(" ")[1]
#     refresh_token = request.headers.get("X-REFRESH-TOKEN")

#     if not access_token or not refresh_token:
#         return (
#             jsonify(
#                 {
#                     "msg": "Access token (Authorization header) and refresh token (X-Refresh-Token) are required"
#                 }
#             ),
#             400,
#         )

#     current_user_id = get_jwt_identity()

#     try:
#         decoded_access_token = decode_token(access_token)
#         decoded_refresh_token = decode_token(refresh_token)
#         access_jti = decoded_access_token.get("jti")
#         refresh_jti = decoded_refresh_token.get("jti")
#         access_user_id = decoded_access_token.get("sub")
#         refresh_user_id = decoded_refresh_token.get("sub")
#     except Exception as e:
#         return (
#             jsonify(
#                 {"msg": "An error occurred during decoding tokens", "error": str(e)}
#             ),
#             400,
#         )

#     # Check if tokens belong to the logged-in user
#     if current_user_id != access_user_id or current_user_id != refresh_user_id:
#         return jsonify({"msg": "Token user mismatch"}), 400

#     success, msg = revoke_tokens(current_app, access_jti, refresh_jti)

#     if success:
#         return jsonify({"msg": "Successfully logged out"}), 200
#     else:
#         return jsonify({"msg": "Logout failed", "error": msg}), 400
