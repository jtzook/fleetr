from flask_jwt_extended import JWTManager
from flask import request
from flask_jwt_extended import verify_jwt_in_request


def init_jwt(app):
    JWTManager(app)

    def verify_protected_routes():
        exclude_paths = ["/api/refresh"]  # Add any other paths you want to exclude here

        if request.path.startswith("/api") and request.path not in exclude_paths:
            verify_jwt_in_request()

    app.before_request(verify_protected_routes)
