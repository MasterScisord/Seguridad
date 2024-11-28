from django.urls import path
from .views import (
    index,
    validate_user,
    Home
)

urlpatterns = [
    path("", index, name="index"),
    path('validate_user/', validate_user, name='validate_user'),
    path("home/", Home, name="Home"),

]