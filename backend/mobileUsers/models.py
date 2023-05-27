from django.contrib.auth.models import Group, PermissionsMixin, Permission, AbstractUser, PermissionsMixin, AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext as _
from .managers import MobileUserManager
from django.utils import timezone
# from users.models import CustomUser
# Create your models here.

class MobileUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=False)
    first_name = models.CharField(max_length=120, default='')
    last_name = models.CharField(max_length=120, default='')
    contact = models.CharField(max_length=120, default='')
    is_staff = models.BooleanField(default=False)
    is_mobile_user = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField(default=timezone.now)
    groups = models.ManyToManyField(Group, blank=True, related_name='mobile_users')
    user_permissions = models.ManyToManyField(
        Permission,
        blank=True,
        related_name='mobile_users',
        help_text=_('Specific permissions for this user.'),
        verbose_name=_('user permissions'),
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username')

    objects = MobileUserManager()

    def __str__(self):
        return self.email
 