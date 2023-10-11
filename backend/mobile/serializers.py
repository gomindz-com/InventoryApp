from rest_framework import serializers
from .models import mProduct, Damages, TransactionProducts, Transaction




class mProductSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = mProduct
        fields = ('id', 'name','stock', 'description_color', 'buy_rate', 'owner')


class TransactionSerializer(serializers.ModelSerializer): 
    products = serializers.SlugRelatedField(
                read_only=False,
                slug_field="name",
                queryset=mProduct.objects.all()
                )   
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )
    class Meta:
        model = Transaction
        fields = ('id', 'products','current_stock','remark', 'quantity', 'type', 'owner')
        depth = 1


class TransactionProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionProducts
        fields = ['id', 'product', 'transaction', 'quantity']


class DamagesSerializer(serializers.ModelSerializer):

    product = serializers.SlugRelatedField(
                read_only=False,
                slug_field="name",
                queryset=mProduct.objects.all()
                )

    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = Damages
        fields = ('id', 'product', 'damages', 'owner')

