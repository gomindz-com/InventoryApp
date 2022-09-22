from django.db import models

from users.models import User


class Supplier(models.Model):
    companyName = models.CharField(max_length=200, default='')
    country = models.CharField(max_length=200, default='')
    phone_number = models.CharField(max_length=200, default='')
    industry = models.CharField(max_length=200, default='')
    contactName = models.CharField(max_length=200, default='')
    email = models.CharField(max_length=200, default='')
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
    email = models.CharField(max_length=220, default='')
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
    name = models.CharField(max_length=120, unique=True)
    label = models.CharField(max_length=120, default='')
    tags = models.CharField(max_length=120, default='')
    price = models.CharField(max_length=120, default='')
    stock = models.CharField(max_length=120, default='')
    category_id = models.CharField(max_length=120 , default='')
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
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    design = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, null=True)
    season = models.ForeignKey(Season, on_delete=models.CASCADE, null=True)
    drop = models.ForeignKey(Drop, on_delete=models.CASCADE, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICE)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.product.name


class Delivery(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    courier_name = models.CharField(max_length=120)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.courier_name
