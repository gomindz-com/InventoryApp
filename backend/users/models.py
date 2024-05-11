from django.contrib.auth.models import Group, PermissionsMixin
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext as _
from .managers import CustomUserManager
from django.utils import timezone


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
    is_mobile_user = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    groups = models.ManyToManyField(Group, blank=True, related_name='custom_users')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
 

class UserActivity(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    details = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.activity_type}'




