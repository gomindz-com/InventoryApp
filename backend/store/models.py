from django.db import models
from django.utils.translation import gettext_lazy as _


def upload_to(instance, filename):
    return 'products/{filename}'.format(filename=filename) 



class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=220)
    created_date = models.DateField(auto_now_add=True)
    owner = models.ForeignKey('users.CustomUser', related_name='categories', on_delete=models.CASCADE, default='')
    
    def __str__(self):
        return self.name

    

class Product(models.Model):
    STATUS_CHOICE = (
        ('in_stock', 'In Stock'),
        ('out_of_stock', 'Out of Stock'),
    )
    name = models.CharField(max_length=120, unique=True)
    description_color = models.CharField(max_length=120, default='')
    price = models.DecimalField(max_digits=120, decimal_places=2)
    stock = models.PositiveIntegerField(default='')
    status = models.CharField(max_length=120, choices=STATUS_CHOICE, default='')
    supplier = models.CharField(max_length=50, default='')
    image = models.ImageField(_('Image'), upload_to= upload_to, default='products/default.png')
    owner = models.ForeignKey('users.CustomUser', related_name='%(class)s_products', on_delete=models.CASCADE,  default=1)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, default='')
    created_date = models.DateField(auto_now_add=True)


    def __str__(self):
        return self.name


class Damages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.CharField(max_length=220)
    damages = models.PositiveIntegerField(default=0) 
    created_date = models.DateField(auto_now_add=True)
    owner = models.ForeignKey('users.CustomUser', related_name='damages', on_delete=models.CASCADE, default='')




class Order(models.Model):
    STATUS_CHOICE = (
        ('pending', 'Pending'),
        ('decline', 'Decline'),
        ('approved', 'Approved'),
        ('processing', 'Processing'),
        ('complete', 'Complete'),
        ('bulk', 'Bulk'),
    )
    TYPE_CHOICE = (
        ('invoice', 'Invoice'),
        ('receipt', 'Receipt'),
        ('order', 'Order'),
    )
    buyer = models.CharField(max_length=50, default='')
    buyer_location = models.CharField(max_length=50, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='')
    ref = models.CharField(max_length=50, default='')
    total_price = models.FloatField(default=0.00) 
    products = models.ManyToManyField(Product, through='OrderProducts')
    type=models.CharField(max_length=20, choices=TYPE_CHOICE, default='')
    created_date = models.DateField(auto_now_add=True)
    owner = models.ForeignKey('users.CustomUser', related_name='orders', on_delete=models.CASCADE, default='')


class OrderProducts(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1) 

    def __str__(self):
        return "{}_{}".format(self.order.__str__(), self.product.__str__())






class Supplier(models.Model):
    companyName = models.CharField(max_length=200, default='')
    country = models.CharField(max_length=200, default='')
    phone_number = models.CharField(max_length=200, default='')
    industry = models.CharField(max_length=200, blank=True,default='')
    contactName = models.CharField(max_length=200, default='')
    email = models.EmailField(max_length=200,blank=True, default='')
    additional_information= models.CharField(max_length=200,blank=True, default='')
    additional_files= models.CharField(max_length=200,blank=True, default='')
    created_date = models.DateField(auto_now_add=True)
    name = models.CharField(max_length=120,blank=True)
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

    def __str__(self):
        return self.name


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


class mobileProduct(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.CharField(max_length=120, default='')
    price = models.DecimalField(max_digits=120, decimal_places=2)
    created_date = models.DateField(auto_now_add=True)
  
    def __str__(self):
        return self.name