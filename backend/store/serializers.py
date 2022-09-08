from dataclasses import field
import imp
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'label', 'tags', 'price', 'stock', 'sortno', 'category_id', 'images']