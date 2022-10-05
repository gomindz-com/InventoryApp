from dataclasses import field
import imp
from rest_framework import serializers
from .models import Product, Supplier

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