from flask_jwt_extended import JWTManager
from flask import request
from flask_jwt_extended import verify_jwt_in_request


def init_jwt(app):
    app.config["JWT_SECRET_KEY"] = "super-secret"
    JWTManager(app)

    def verify_protected_routes():
        if request.path.startswith("/api"):
            verify_jwt_in_request()

    app.before_request(verify_protected_routes)
