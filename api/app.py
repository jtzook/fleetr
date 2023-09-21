from flask import Flask
from flask_cors import CORS

from database.db_client import init_db
from routes.public import public_routes
from routes.protected import protected_routes
from configs.jwt_config import init_jwt
from configs.app_config import Config

app = Flask(__name__)

# add configs to app
app.config.from_object(Config)

CORS(
    app,
    supports_credentials=True,
    resources={
        r"/*": {
            "origins": app.config["ALLOWED_ORIGIN"],
            "allow_headers": "X-CSRF-Token",
        }
    },
)

# register routes
app.register_blueprint(public_routes)
app.register_blueprint(protected_routes, url_prefix="/api")

# initialize database
init_db(app)

# initialize jwt auth
init_jwt(app)

if __name__ == "__main__":
    app.run(app.config["DEBUG"])
