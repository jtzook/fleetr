from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
)

api = Blueprint("protected", __name__)


# lambda function to combine route prefix and route name
# e.g. api/protected
def full_route(endpoint_name):
    protected_route_prefix = "api"
    return f"/{protected_route_prefix}/{endpoint_name}"


@api.route(full_route("refresh"), methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_token), 200


@api.route(full_route("protected"), methods=["GET"])
def protected():
    return jsonify({"msg": "You have access to this resource"})


@api.route(full_route("logout"), methods=["POST"])
@jwt_required()
def logout():
    # Implement JWT token revoking here
    return jsonify({"msg": "Successfully logged out"}), 200
