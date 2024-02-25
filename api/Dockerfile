# Use the official Python base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project files to the working directory
COPY . .

# Expose the port on which the Django app will run
EXPOSE 8000

# Set the environment variables
ENV DJANGO_SETTINGS_MODULE=your_project.settings.production

# Run the Django app using Gunicorn as the server
CMD ["gunicorn", "your_project.wsgi:application", "--bind", "0.0.0.0:8000"]
