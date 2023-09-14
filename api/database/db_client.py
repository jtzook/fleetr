import sqlite3
import os


# path to current directory
DATA_DIR = os.path.dirname(os.path.abspath(__file__))


def apply_sql_file(cursor, file_path):
    full_path = os.path.join(DATA_DIR, file_path)
    with open(full_path, "r") as f:
        cursor.executescript(f.read())


def init_db(app):
    with app.app_context():
        db_path = os.path.join(
            app.config["DATABASE_DIRECTORY"], app.config["DATABASE_NAME"]
        )
        db = sqlite3.connect(db_path)
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
    db_path = f"{app.config['DATABASE_DIRECTORY']}/{app.config['DATABASE_NAME']}"
    try:
        connection = sqlite3.connect(db_path)
        cursor = connection.cursor()

        cursor.execute(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
            (email, hashed_password, first_name, last_name),
        )

        connection.commit()
        connection.close()

        return True, "User registered successfully"

    except sqlite3.Error as err:
        return False, str(err)
