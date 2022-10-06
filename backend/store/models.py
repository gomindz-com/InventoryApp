from django.db import models

from users.models import User


class Supplier(models.Model):
    companyName = models.CharField(max_length=200, default='')
    country = models.CharField(max_length=200, default='')
    phone_number = models.CharField(max_length=200, default='')
    industry = models.CharField(max_length=200, default='')
    contactName = models.CharField(max_length=200, default='')
    email = models.EmailField(max_length=200, default='')
    additional_information= models.CharField(max_length=200, default='')
    additional_files= models.CharField(max_length=200, default='')
    created_date = models.DateField(auto_now_add=True)
    name = models.CharField(max_length=120, unique=True)
    address = models.CharField(max_length=220)

    def __str__(self):
        return self.companyName


class Buyer(models.Model):
    name = models.CharField(max_length=120, unique=True)
    address = models.CharField(max_length=220, default='')
    mobile_number = models.CharField(max_length=220, default='')
    email = models.EmailField(max_length=220, default='')
    tax_id = models.CharField(max_length=220, default='')
    created_date = models.DateField(auto_now_add=True)

    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class Season(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=220)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Drop(models.Model):
    name = models.CharField(max_length=120, unique=True)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    STATUS_CHOICE = (
        ('In Stock', 'In Stock'),
        ('Out of Stock', 'Out of Stock'),
    )
    name = models.CharField(max_length=120, unique=True)
    label = models.CharField(max_length=120, default='')
    tags = models.CharField(max_length=120, default='')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.PositiveIntegerField(max_length=120, default='')
    status = models.CharField(max_length=120, choices=STATUS_CHOICE, default='')

    category = models.ForeignKey('Category', on_delete=models.CASCADE, default='')
    images = models.CharField(max_length=120 , default='')
    sortno = models.PositiveIntegerField()
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICE = (
        ('pending', 'Pending'),
        ('decline', 'Decline'),
        ('approved', 'Approved'),
        ('processing', 'Processing'),
        ('complete', 'Complete'),
        ('bulk', 'Bulk'),
    )
    supplier = models.ForeignKey('Supplier', on_delete=models.CASCADE, default='')
    product = models.ForeignKey('Product', on_delete=models.CASCADE, default='')
    color = models.CharField(max_length=50, default='')
    buyer = models.ForeignKey('Buyer', on_delete=models.CASCADE, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='')
    reciept = models.CharField(max_length=50, default='')
    created_date = models.DateField(auto_now_add=True)
    
    design = models.CharField(max_length=50, default='')
    season = models.CharField(max_length=50, default='')
    drop = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.product.name


class Delivery(models.Model):
    STATUS_CHOICE = (
        ('delivered', 'delivered'),
        ('pending', 'pending'),
    )
    reference=models.CharField(max_length=120, default='')
    status=models.CharField(max_length=20, choices=STATUS_CHOICE, default='')
    reciept=models.CharField(max_length=120, default='')
    order = models.ForeignKey('Order', on_delete=models.CASCADE, default='')
    courier_name = models.CharField(max_length=120,default='')
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.courier_name


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=220)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name