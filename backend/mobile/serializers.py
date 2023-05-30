from rest_framework import serializers
from .models import Product, Damages, TransactionProducts, Transaction




class ProductSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = Product
        fields = ('id', 'name', 'description_color', 'buy_rate', 'owner')


class TransactionSerializer(serializers.ModelSerializer):    
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )
    class Meta:
        model = Transaction
        fields = ('id', 'products', 'buyer','current_stock', 'type', 'total_price', 'owner')
        depth = 1


class TransactionProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionProducts
        fields = ['id', 'product', 'transaction', 'quantity']


class DamagesSerializer(serializers.ModelSerializer):

    product = serializers.SlugRelatedField(
                read_only=False,
                slug_field="name",
                queryset=Product.objects.all()
                )

    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = Damages
        fields = ('id', 'product', 'damages', 'owner')






































# class CategorySerializer(serializers.ModelSerializer):

#     owner = serializers.PrimaryKeyRelatedField(
#         read_only=True,
#     )

#     class Meta:
#         model = Category
#         fields = ('id', 'name', 'description', 'owner')

    # category = serializers.SlugRelatedField(
    #             read_only=False,
    #             slug_field="name",
    #             queryset=Category.objects.all()
    #             )
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


class ProductOrderSerializer(serializers.ModelSerializer):
    class Meta:
        #model = ProductQuantity
        fields = ['id', 'product', 'order',
                  'product_quantity']


class DeliveriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['id', 'reference', 'order', 'courier_name','status', 'reciept']
