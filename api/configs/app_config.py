import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = os.getenv("DEBUG") == "True"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    DATABASE_DIRECTORY = os.getenv("DATABASE_DIRECTORY")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN")  # e.g. http://localhost:3000
