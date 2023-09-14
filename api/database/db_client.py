import sqlite3
import os

from werkzeug.security import check_password_hash

# path to current directory
DATA_DIR = os.path.dirname(os.path.abspath(__file__))


def get_db_path(app):
    return f"{app.config['DATABASE_DIRECTORY']}/{app.config['DATABASE_NAME']}"


def apply_sql_file(cursor, file_path):
    full_path = os.path.join(DATA_DIR, file_path)
    with open(full_path, "r") as f:
        cursor.executescript(f.read())


def init_db(app):
    with app.app_context():
        db = sqlite3.connect(get_db_path(app))
        cursor = db.cursor()

        # Apply initial schema
        apply_sql_file(cursor, "schema.sql")

        # Apply migrations
        migrations_dir = os.path.join(DATA_DIR, "migrations")
        for filename in sorted(os.listdir(migrations_dir)):
            if filename.endswith(".sql"):
                apply_sql_file(cursor, os.path.join(migrations_dir, filename))

        db.commit()


def register_user(app, email, hashed_password, first_name, last_name):
    try:
        connection = sqlite3.connect(get_db_path(app))
        cursor = connection.cursor()

        cursor.execute("SELECT email FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            connection.close()
            return False, f"User with email '{email}' already exists"

        cursor.execute(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
            (email, hashed_password, first_name, last_name),
        )

        connection.commit()
        connection.close()

        return True, f"User '{email}' registered successfully"

    except sqlite3.Error as err:
        return False, str(err)


def check_user_credentials(app, email, password):
    try:
        connection = sqlite3.connect(get_db_path(app))
        cursor = connection.cursor()
        cursor.execute("SELECT email, password FROM users WHERE email = ?", (email,))
        record = cursor.fetchone()
        connection.close()

        if record:
            db_email, db_hashed_password = record
            if check_password_hash(db_hashed_password, password):
                return True, "User authenticated successfully"
        return False, "Incorrect email or password"
    except sqlite3.Error as err:
        return False, str(err)
