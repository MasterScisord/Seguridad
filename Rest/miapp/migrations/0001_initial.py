# Generated by Django 5.0.7 on 2024-11-28 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('IDEmpleado', models.CharField(max_length=7, primary_key=True, serialize=False)),
                ('NombreUsuario', models.CharField(max_length=14)),
                ('Password', models.CharField(max_length=8)),
            ],
        ),
    ]