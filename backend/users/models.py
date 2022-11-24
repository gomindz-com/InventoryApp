from ast import mod
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    firstname = models.CharField(max_length=120, default='')
    lastname = models.CharField(max_length=120, default='')
    email = models.CharField(max_length=120, unique=True, default='')
    password = models.CharField(max_length=120, default='')
    contact = models.CharField(max_length=120, default='')
    postcode = models.CharField(max_length=120, default='')
    streetAddress = models.CharField(max_length=120, default='')
    city = models.CharField(max_length=120, default='')
    region = models.CharField(max_length=120, default='')
    is_buyer = models.BooleanField(default=False)
    is_supplier = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
 