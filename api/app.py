from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    get_jwt_identity,
    create_access_token,
    create_refresh_token,
    verify_jwt_in_request,
)
from email_validator import validate_email, EmailNotValidError

import sqlite3


app = Flask(__name__)


create_db = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""


# Initialize SQLite database
def init_db():
    with app.app_context():
        db = sqlite3.connect("fleetr.db")
        cursor = db.cursor()
        cursor.execute(create_db)
        db.commit()


init_db()


# Initialize JWT
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)


def verify_protected_routes():
    if request.path.startswith("/protected"):
        verify_jwt_in_request()


app.before_request(verify_protected_routes)


@app.route("/")
def hello_world():
    return jsonify({"msg": "Hello World!"})


@app.route("/login", methods=["POST"])
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


@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_token), 200


@app.route("/protected", methods=["GET"])
def protected():
    return jsonify({"msg": "You have access to this resource"})


@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    # Implement JWT token revoking here
    return jsonify({"msg": "Successfully logged out"}), 200


if __name__ == "__main__":
    app.run(debug=True)
