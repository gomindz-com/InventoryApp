# Generated by Django 4.1.3 on 2023-05-13 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_createuser_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='createuser',
            name='password',
        ),
    ]