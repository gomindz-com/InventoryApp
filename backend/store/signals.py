from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import StoreActivity, Category, Product
from users.models import CustomUser

@receiver(post_save, sender=Product)
def log_category_creation(sender, instance, created, **kwargs):
    if created:
        user = instance.owner  # Assuming created_by is a ForeignKey to User in Product model
        StoreActivity.objects.create(user=user, activity_type='Category Created', details=instance.name)


@receiver(post_save, sender=Product)
def log_product_creation(sender, instance, created, **kwargs):
    if created:
        user = instance.owner  # Assuming created_by is a ForeignKey to User in Product model
        StoreActivity.objects.create(user=user, activity_type='Product Created', details=instance.name)
