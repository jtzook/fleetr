"""
URL configuration for api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from .views import RegistrationView

"""
The following URLs are built in to Django's auth app:

    users/login/ [name='login']
    users/logout/ [name='logout']
    users/password_change/ [name='password_change']
    users/password_change/done/ [name='password_change_done']
    users/password_reset/ [name='password_reset']
    users/password_reset/done/ [name='password_reset_done']
    users/reset/<uidb64>/<token>/ [name='password_reset_confirm']
    users/reset/done/ [name='password_reset_complete']

-> Note that user registration is not included in Django's auth app
"""

urlpatterns = [
    path("admin/", admin.site.urls),
    path("users/register", RegistrationView.as_view(), name="register"),
    path("users/", include("django.contrib.auth.urls")),
    path("fleets/", include("fleets.urls")),
]
