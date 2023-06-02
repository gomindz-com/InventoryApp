from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description_color = models.CharField(max_length=120, default='')
    buy_rate = models.DecimalField(max_digits=120, decimal_places=2)
    stock= models.PositiveIntegerField(default=0)
    owner = models.ForeignKey('users.CustomUser', related_name='%(class)s_mobile_products', on_delete=models.CASCADE,  default=1)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Transaction(models.Model):
    TYPE_CHOICE = (
        ('in', 'In'),
        ('out', 'Out'),
    )
    current_stock = models.PositiveIntegerField(default=0)
    quantity = models.PositiveIntegerField(default=0) 
    remark = models.CharField(max_length=120, default='')
    products = models.ForeignKey("Product", on_delete=models.CASCADE)
    type=models.CharField(max_length=20, choices=TYPE_CHOICE, default='')
    created_date = models.DateField(auto_now_add=True)
    owner = models.ForeignKey('users.CustomUser', related_name='transaction', on_delete=models.CASCADE, default=1)

class TransactionProducts(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1) 

    def __str__(self):
        return "{}_{}".format(self.order.__str__(), self.product.__str__())
    
class Damages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    damages = models.PositiveIntegerField(default=0) 
    created_date = models.DateField(auto_now_add=True)
    owner = models.ForeignKey('users.CustomUser', related_name='damage', on_delete=models.CASCADE, default='')