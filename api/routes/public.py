from flask import Blueprint, jsonify, request, current_app
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)
from email_validator import validate_email, EmailNotValidError
from werkzeug.security import generate_password_hash
from data.database import register_user

public_routes = Blueprint("public", __name__)


@public_routes.route("/")
def hello_world():
    return jsonify({"msg": "Hello World!"})


@public_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name", "")
    last_name = data.get("last_name", "")

    if email is None or password is None:
        return jsonify({"msg": "Email and password are required"}), 400

    if len(password) < 8:
        return jsonify({"msg": "Password must be at least 8 characters long"}), 400

    try:
        v = validate_email(email)
        email = v["email"]
    except EmailNotValidError as e:
        return jsonify({"msg": "Email is not valid"}), 400

    hashed_password = generate_password_hash(password, method="sha256")

    success, message = register_user(
        current_app, email, hashed_password, first_name, last_name
    )

    if success:
        return jsonify({"message": message}), 201
    else:
        return jsonify({"error": message}), 400


@public_routes.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Replace this with your database user authentication
    if email == "example@fleetr.com" and password == "password":
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200

    return jsonify({"msg": "Incorrect email or password. Please try again."}), 401
