from flask import Flask, request
from database import init_db
from routes import api
from jwt_setup import init_jwt

app = Flask(__name__)

# register routes
app.register_blueprint(api)

# initialize database
init_db(app)

# initialize jwt auth
init_jwt(app)

if __name__ == "__main__":
    app.run(debug=True)
