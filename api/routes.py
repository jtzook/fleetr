from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    create_access_token,
    create_refresh_token,
)
from email_validator import validate_email, EmailNotValidError


api = Blueprint("api", __name__)

# unprotected routes


@api.route("/")
def hello_world():
    return jsonify({"msg": "Hello World!"})


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    try:
        v = validate_email(email)
        email = v["email"]
    except EmailNotValidError as e:
        # Email is not valid, return 400
        return jsonify({"msg": "Email is not valid"}), 400

    # Replace this with your database user authentication
    if email == "example@fleetr.com" and password == "password":
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200

    return jsonify({"msg": "Incorrect email or password. Please try again."}), 401


# protected routes

protected_route_prefix = "api"


# lambda function to combine route prefix and route name
# e.g. api/protected
def full_route(endpoint_name):
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
