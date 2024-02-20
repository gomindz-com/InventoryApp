from rest_framework import serializers
from .models import Product, Category, Damages, Delivery, OrderProducts, Supplier, Buyer, Order, Delivery, StoreActivity


class CategorySerializer(serializers.ModelSerializer):

    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'owner')



class ProductSerializer(serializers.ModelSerializer):

    category = serializers.SlugRelatedField(
                read_only=False,
                slug_field="name",
                queryset=Category.objects.none()
                )
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    class Meta:
        model = Product
        fields = ('id', 'is_active', 'name', 'description_color', 'price', 'cost_price', 'stock', 'status', 'owner', 'category', 'image', 'expiry_date', 'created_date')

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(ProductSerializer, self).__init__(*args, **kwargs)
        if user:
            self.fields['category'].queryset = Category.objects.filter(owner=user)



class OrderSerializer(serializers.ModelSerializer):    
    owner = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )
    class Meta:
        model = Order
        fields = ('id', 'products', 'buyer', 'buyer_location', 'type', 'status', 'ref', 'total_price', 'price_paid', 'owner', 'buyer_phone')
        depth = 1



class OrderProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProducts
        fields = ['id', 'product', 'order', 'quantity']





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
        fields = ('id', 'product', 'category', 'damages', 'owner')




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
                  'mobile_number', 'tax_id', 'owner' ]


class ProductOrderSerializer(serializers.ModelSerializer):
    class Meta:
        #model = ProductQuantity
        fields = ['id', 'product', 'order',
                  'product_quantity']


class DeliveriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Delivery
        fields = ['id', 'reference', 'order', 'courier_name','status', 'reciept']


class StoreActivitySerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    timestamp = serializers.DateTimeField(format='%d-%m-%Y %H:%M:%S')


    class Meta:
        model = StoreActivity
        fields = [ 'id', 'email', 'username', 'activity_type', 'details', 'timestamp']

