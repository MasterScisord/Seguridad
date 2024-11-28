from django.urls import path
from .views import (
    index,
    Home
)

urlpatterns = [
    path("", index, name="index"),
    path("Home/", Home, name="Home"),
]