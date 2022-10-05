from dataclasses import field
import imp
from rest_framework import serializers
from .models import Delivery, Product, Supplier, Buyer, Order, Delivery

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'label', 'tags', 'price', 'stock', 'status', 'sortno', 'category_id', 'images']
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'companyName', 'country', 'address',
                  'phone_number', 'industry', 'contactName',
                  'email', 'additional_information', 'additional_files',
                  'created_date', 'name']
class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = ['id', 'name', 'email', 'address',
                  'mobile_number', 'tax_id' ]
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'supplier', 'product', 'buyer',
                  'status', 'reciept']
class DeliveriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['id', 'reference', 'order', 'courier_name',
                  'status', 'reciept']