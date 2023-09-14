from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)
from email_validator import validate_email, EmailNotValidError

public_routes = Blueprint("public", __name__)


@public_routes.route("/")
def hello_world():
    return jsonify({"msg": "Hello World!"})


@public_routes.route("/login", methods=["POST"])
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
