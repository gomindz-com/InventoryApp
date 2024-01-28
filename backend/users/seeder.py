# seeder.py
from .models import CustomUser
from rest_framework.authtoken.models import Token


def seed_users(num_users=10):
    for i in range(num_users):
        username = f'user_{i}'
        email = f'user_{i}@gmail.com'
        password = 'password123'
        user = CustomUser.objects.create(
            username=username,
            email=email
        )
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
