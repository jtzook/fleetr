from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
)

protected_routes = Blueprint("protected", __name__)


@protected_routes.route("refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_token), 200


@protected_routes.route("protected", methods=["GET"])
def protected():
    return jsonify({"msg": "You have access to this resource"})


@protected_routes.route("logout", methods=["POST"])
def logout():
    # Implement JWT token revoking here
    return jsonify({"msg": "Successfully logged out"}), 200
