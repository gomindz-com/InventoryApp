
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext as _
from .managers import CustomUserManager
from django.utils import timezone

# class User(AbstractUser):
#     companyname = models.CharField(max_length=120, default='')
#     firstname = models.CharField(max_length=120, default='')
#     lastname = models.CharField(max_length=120, default='')
#     username = models.CharField(max_length=120, default='')
#     email = models.CharField(max_length=120, unique=True, null=False)
#     password = models.(max_length=120, default='')
#     contact = models.CharField(max_length=120, default='')
#     postcode = models.CharField(max_length=120, default='')
#     streetAddress = models.CharField(max_length=120, default='')
#     city = models.CharField(max_length=120, default='')
#     is_buyer = models.BooleanField(default=False)
#     is_supplier = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)
#     is_customer = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']


def upload_to(instance, filename):
    return 'profiles/{filename}'.format(filename=filename) 


class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=120, default='')
    last_name = models.CharField(max_length=120, default='')
    profile = models.ImageField(_('Image'), upload_to= upload_to, default='profiles/default.png')
    company_name = models.CharField(max_length=120, default='')
    start_date = models.DateTimeField(default=timezone.now)
    contact = models.CharField(max_length=120, default='')
    city = models.CharField(max_length=120, default='')
    postcode = models.CharField(max_length=120, default='')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
 
