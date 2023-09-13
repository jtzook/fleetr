from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import sqlite3

app = Flask(__name__)

# Initialize JWT
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

create_db = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    first_name TEXT,
    last_name TEXT
)
"""

# Initialize SQLite database
def init_db():
    with app.app_context():
        db = sqlite3.connect("yapper.db")
        cursor = db.cursor()
        cursor.execute(create_db)
        db.commit()

init_db()

@app.route('/')
def hello_world():
    return jsonify({"msg": "Hello World!"})

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Replace this with your database user authentication
    if username == 'test' and password == 'password':
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"msg": "You have access to this resource"})

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Implement JWT token revoking here
    return jsonify({"msg": "Successfully logged out"}), 200

if __name__ == '__main__':
    app.run(debug=True)
