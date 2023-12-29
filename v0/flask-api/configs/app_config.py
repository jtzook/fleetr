import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    DEBUG = os.getenv("DEBUG") == "True"
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    DATABASE_DIRECTORY = os.getenv("DATABASE_DIRECTORY")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN")  # e.g. http://localhost:3000
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = True  # set to False for development
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_REFRESH_COOKIE_NAME = "refresh_token"
    JWT_REFRESH_CSRF_HEADER_NAME = "X-CSRF-Token"
    JWT_REFRESH_CSRF_FIELD_NAME = "csrf_token"
    JWT_CSRF_METHODS = ["POST", "PUT", "PATCH", "DELETE"]
    JWT_CSRF_CHECK_FORM = True
