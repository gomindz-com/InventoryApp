from django.db import models

from users.models import User

# ==================Created Models=========================
class Shop(models.Model):
    name = models.CharField(max_length=120, unique=True)
    id = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=120, unique=True)
    user_id = models.IntegerField(max_length=220)
    user_name = models.IntegerField(max_length=220)
    product_id = models.IntegerField(max_length=220)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    
class Sales(models.Model):
    name = models.CharField(max_length=120, unique=True)
    id = models.OneToOneField(User, on_delete=models.CASCADE)
    price = models.CharField(max_length=220)
    product_id = models.IntegerField(max_length=220)
    total = models.IntegerField(max_length=220)
    qty = models.IntegerField(max_length=220)
    shop_id = models.IntegerField(max_length=220)
    created_date = models.DateField(auto_now_add=True)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    # address = models.CharField(max_length=220)

    def __str__(self):
        return self.name
    
    
class Product(models.Model):
    id = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120, unique=True)
    stock = models.CharField(max_length=220)
    category_id = models.CharField(max_length=220)
    price = models.CharField(max_length=220)
    created_date = models.DateField(auto_now_add=True)
    # image =models.CharField(max_length=220)
    # user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    
# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    
    
# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    
    
# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    
    

# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    
    
# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    
    
# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name
    
    
# class Supplier(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     name = models.CharField(max_length=120, unique=True)
#     address = models.CharField(max_length=220)
#     created_date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name



# ========================Created models end=========================





class Supplier(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120, unique=True)
    address = models.CharField(max_length=220)
    created_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name


class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120, unique=True)
    address = models.CharField(max_length=220)
    created_date = models.DateField(auto_now_add=True)

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
