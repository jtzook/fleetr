#!/bin/bash

# exit on error
set -e

# Wait for Postgres to start
while ! nc -z db 5432; do
    sleep 0.1
done

# Apply database migrations if any
python manage.py migrate --noinput

# Start the Django development server
python manage.py runserver 0.0.0.0:8000
