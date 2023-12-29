from flask import Blueprint, jsonify, request, current_app, make_response
from flask_jwt_extended import create_access_token, create_refresh_token
from email_validator import validate_email, EmailNotValidError
from werkzeug.security import generate_password_hash
from database.db_client import (
    register_user,
    check_user_credentials,
)

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

    hashed_password = generate_password_hash(password, method="scrypt")

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

    is_authenticated, user_id = check_user_credentials(current_app, email, password)

    if is_authenticated:
        access_token = create_access_token(identity=user_id)
        refresh_token = create_refresh_token(identity=user_id)
        csrf_token = create_access_token(identity=user_id, expires_delta=False)

        response = make_response(jsonify({"message": "Logged in successfully"}))
        response.set_cookie(
            "access_token", access_token, httponly=True, secure=True, samesite="Strict"
        )
        response.set_cookie(
            "refresh_token",
            refresh_token,
            httponly=True,
            secure=True,
            samesite="Strict",
        )
        response.set_cookie(
            "csrf_token",
            csrf_token,
            httponly=False,  # Make it accessible to JavaScript
            secure=True,
            samesite="Strict",
        )

        return response

    return jsonify({"msg": "Incorrect email or password. Please try again."}), 401