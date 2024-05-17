# management/commands/check_expired_products.py
from django.core.management.base import BaseCommand
from datetime import date
from store.models import Product, Damages



def my_scheduled_job(self, *args, **kwargs):
    # Get today's date
    today = date.today()
    
    # Query for products that have expired
    expired_products = Product.objects.filter(expiry_date__lte=today)
    
    # Add expired products to damages
    for product in expired_products:
        Damages.objects.create(
            owner=product.owner, product=product, category=product.category, damages=product.stock)
    
    self.stdout.write(self.style.SUCCESS('Successfully checked for expired products and added them to damages'))

