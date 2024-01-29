from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser
from .models import UserActivity

@receiver(post_save, sender=CustomUser)
def log_user_registration(sender, instance, created, **kwargs):
    if created:
        # Add user registration activity
        UserActivity.objects.create(user=instance, activity_type='registration', details='User registered')
