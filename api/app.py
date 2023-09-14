from flask import Flask
from database import init_db
from routes import api
from jwt_setup import init_jwt
from config import Config

app = Flask(__name__)

# configure app
app.config.from_object(Config)

# register routes
app.register_blueprint(api)

# initialize database
init_db(app)

# initialize jwt auth
init_jwt(app)

if __name__ == "__main__":
    app.run(app.config["DEBUG"])
