# Generated by Django 4.1.3 on 2023-05-13 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_remove_createuser_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='createuser',
            name='password',
            field=models.CharField(default='', max_length=8),
        ),
    ]
