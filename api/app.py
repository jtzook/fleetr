from flask import Flask, request
from flask_jwt_extended import (
    JWTManager,
    verify_jwt_in_request,
)
from database import init_db
from routes import api


app = Flask(__name__)

# register routes
app.register_blueprint(api)

# initialize database
init_db(app)


# Initialize JWT
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)


def verify_protected_routes():
    if request.path.startswith("/protected"):
        verify_jwt_in_request()


app.before_request(verify_protected_routes)


if __name__ == "__main__":
    app.run(debug=True)
