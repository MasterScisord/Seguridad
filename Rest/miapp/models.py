from django.db import models

# Create your models here.

class Administrador(models.Model):
    IDEmpleado = models.CharField(primary_key=True, max_length=7)
    NombreUsuario = models.CharField(max_length=14)
    Password = models.CharField(max_length=8)