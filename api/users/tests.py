from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

BASE_URL = "http://localhost:8000/users/"


class UserAccountTests(APITestCase):
    def setUp(self):
        self.register_url = BASE_URL + "register/"
        self.login_url = BASE_URL + "login/"
        self.logout_url = BASE_URL + "logout/"

        self.user_data = {
            "username": "testuser",
            "password": "testpassword123",
            "email": "test@example.com",
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_register_user(self):
        response = self.client.post(
            self.register_url,
            {
                "username": "newuser",
                "password": "newpassword123",
                "email": "newuser@example.com",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_login_user(self):
        response = self.client.post(
            self.login_url,
            {
                "username": "testuser",
                "password": "testpassword123",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_user(self):
        self.client.login(username="testuser", password="testpassword123")
        response = self.client.post(self.logout_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
