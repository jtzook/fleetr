FROM python:3.9

# Prevents Python from writing pyc files to disc and from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

WORKDIR /app

# Update the package list, install netcat-openbsd, and clean up
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install pipenv
RUN pip install --no-cache-dir pipenv
COPY Pipfile Pipfile.lock /app/
RUN pipenv install --deploy --system

# Copy application code and ensure entrypoint script is executable
COPY . /app
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
