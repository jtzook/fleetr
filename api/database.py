import sqlite3

create_db = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
"""


def init_db(app):
    with app.app_context():
        db = sqlite3.connect("fleetr.db")
        cursor = db.cursor()
        cursor.execute(create_db)
        db.commit()
