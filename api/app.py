from flask import Flask
from database.db_client import init_db
from routes.public import public_routes
from routes.protected import protected_routes
from configs.jwt_config import init_jwt
from configs.app_config import Config

app = Flask(__name__)

# configure app
app.config.from_object(Config)

# register routes
app.register_blueprint(public_routes)
app.register_blueprint(protected_routes, url_prefix="/api")

# initialize database
init_db(app)

# initialize jwt auth
init_jwt(app)

if __name__ == "__main__":
    app.run(app.config["DEBUG"])
