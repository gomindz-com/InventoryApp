from django.db import models
from django.contrib.auth.models import Group, PermissionsMixin, AbstractUser, Permission
from django.utils.translation import gettext as _
from .managers import MobileUserManager
from django.utils import timezone

# Create your models here.
class MobileUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=120, default='')
    last_name = models.CharField(max_length=120, default='')
    username = models.CharField(max_length=120, unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    groups = models.ManyToManyField(Group, blank=True, related_name='mobile_users')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='mobileuser_set')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    objects = MobileUserManager()

    def __str__(self):
        return self.email
    

class UserActivity(models.Model):
    user = models.ForeignKey(MobileUser, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    details = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} - {self.activity_type}'