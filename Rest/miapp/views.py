from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Administrador
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

def index(request):
    return render(request, "core/index.html")

def Home(request):
    return render(request, "core/Home.html")

@csrf_exempt
def validate_user(request):
    if request.method == 'POST':
        try:
            # Parsear datos de la solicitud
            data = json.loads(request.body)
            username = data.get('username', '').strip()
            password = data.get('password', '').strip()

            # Validar caracteres alfanuméricos en NombreUsuario y Password
            if not username.isalnum() or not password.isalnum():
                return JsonResponse({'success': False, 'error': 'Caracteres especiales no permitidos.'})

            # Verificar si el usuario existe
            user = Administrador.objects.filter(NombreUsuario=username).first()

            # Validar contraseña
            if user and user.Password == password:
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'error': 'Usuario o contraseña incorrectos.'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': 'Error en el servidor.'})
    return JsonResponse({'success': False, 'error': 'Método no permitido.'})