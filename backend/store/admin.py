from django.contrib import admin

from .models import (
    Invoice,
    Supplier,
    Buyer,
    Season,
    Drop,
    Product,
    Sale,
    User_Order,
    Shop,
    Order,
    Delivery,
    Transaction,
    Invoice,
    Categorie,
    Customer
)


class SupplierAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'address', 'created_date']


class BuyerAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'address', 'created_date']


admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Buyer, BuyerAdmin)
admin.site.register(Season)
admin.site.register(Drop)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Delivery)
admin.site.register(Shop)
admin.site.register(Sale)
admin.site.register(Transaction)
admin.site.register(Invoice)
admin.site.register(Categorie)
admin.site.register(User_Order)
admin.site.register(Customer)
