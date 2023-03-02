from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import Sum

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, mixins, viewsets, filters, permissions
from rest_framework.permissions import SAFE_METHODS, BasePermission, IsAdminUser, DjangoModelPermissionsOrAnonReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser)
from rest_framework.request import Request
from django.http import HttpResponse

from users.models import CustomUser
from .models import (Product, OrderProducts, Supplier,
                     Buyer, Order, Delivery, Category)
from .serializers import ProductSerializer, SupplierSerializer, CategorySerializer, BuyerSerializer, OrderSerializer, DeliveriesSerializer


parser_classes = [MultiPartParser, FormParser]


# TWILIO


account_sid = ''
authToken = ''
client = Client(account_sid, authToken)


@csrf_exempt
def twilio(request):
    # message = request.POST["message"]
    client.messages.create(
        from_='whatsapp:+14155238886',
        body="Hi",
        # media_url='https://www.aims.ca/site/media/aims/2.pdf',
        # media_url='https://91d7-197-255-199-14.eu.ngrok.io/static/images/gooo.pdf',
        to='whatsapp:+2207677435',
    )
    print(request.POST)

    return HttpResponse("Hello")


# PRODUCT PERMISSIONS

class ProductPermission(BasePermission):
    message = 'Editing Products is Restricted to The owner only'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.owner == request.user


# LIST ALL CUSTOMER PRODUCTS / CREATE A PRODUCT

class ProductListCreateView(generics.ListCreateAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(owner=user)


# LIST DETAIL OF ONE PRODUCT / UPDATE / DELETE

class ProductRetreiveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        user = self.request.user
        return get_object_or_404(Product, id=item, owner=user)


# LIST ALL CUSTOMER PRODUCTS CATEGORIES / CREATE A PRODUCT CATEGORY

class CategoryListCreateView(generics.ListCreateAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def get(self, request, *args, **kwargs):
        user = self.request.user
        category = Category.objects.filter(owner=user)
        categoryList = []
        categoryAmountSoldList = []

        for item in category.iterator():

            amountQuantity = 0

            categoryname = item.name
            categoryAmountSoldList.append({
                "categoryName": item.name,
                "amount":  0
            })

            myorder = Order.objects.filter(owner=user)
            for orderitems in myorder.iterator():
                productQuantity = OrderProducts.objects.filter(
                    order_id=orderitems.id)
                for oneproductQuantityRow in productQuantity.iterator():
                    category = Product.objects.get(
                        id=oneproductQuantityRow.product_id)

                    if (item.id == category.category_id):
                        amountQuantity = amountQuantity + oneproductQuantityRow.quantity

            for itemcategoryAmountSoldList in categoryAmountSoldList:
                if categoryname == itemcategoryAmountSoldList["categoryName"]:
                    itemcategoryAmountSoldList["amount"] = amountQuantity

            stock = 0
            aproduct = Product.objects.filter(category_id=item.id)
            for productItem in aproduct.iterator():
                stock = stock + productItem.stock

            categoryList.append({
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "stock": stock,
                "amount": amountQuantity
            })

        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': categoryList})

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Category.objects.filter(owner=user)


# LIST DETAIL OF ONE CATEGORY / UPDATE / DELETE

class CategoryRetreiveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    # Define Custom Queryset
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        user = self.request.user
        return get_object_or_404(Category, id=item, owner=user)


# LIST ALL CUSTOMER ORDERS / CREATE A CUSTOMER ORDER

class OrderListCreateView(generics.ListCreateAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(owner=user)


# LIST ALL CUSTOMER ORDERS / CREATE A CUSTOMER ORDER

@api_view(['GET', 'POST'])
def order_list(request):
    if request.method == 'GET':
        user = request.user
        order = Order.objects.filter(owner=user).exclude(type="invoice")
        orderList = []
        for item in order.iterator():
            productList = []
            price = 0
            productsOrders = OrderProducts.objects.filter(order_id=item.id)

            for productsOrdersItem in productsOrders.iterator():
                aProduct = Product.objects.get(
                    id=productsOrdersItem.product_id)
                productList.append({
                    "id": aProduct.id,
                    "name": aProduct.name,
                    "description_color": aProduct.description_color,
                    "price": aProduct.price,
                    "quantity": productsOrdersItem.quantity,
                    "amount": aProduct.price * productsOrdersItem.quantity
                })
                price = price + (aProduct.price * productsOrdersItem.quantity)

            orderList.append(
                {
                    "id": item.id,
                    "buyer": item.buyer,
                    "products": productList,
                    "status": item.status,
                    "receipt":  item.receipt,
                    "type": item.type,
                    "total_price":  price,
                },
            )
        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        data = request.data
        user = request.user
        new_order = Order.objects.create(
            owner=user, buyer=data["buyer"], status=data["status"], receipt=data["receipt"], type=data["type"], total_price=data["total_price"])
        new_order.save()

        for product in data['products']:
            new_product_order = OrderProducts.objects.create(
                product_id=product['id'],  order_id=new_order.id, quantity=product['amount'])
            new_product_order.save()

            try:
                aproduct = Product.objects.get(pk=product['id'])
                aproduct.stock = aproduct.stock - product['amount']
                if (aproduct.stock - product['amount'] < 0):
                    new_order.delete()
                    return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'false', 'message':  'Product Out Of Stock Error', 'result': []})
                else:
                    aproduct.save()
            except Product.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'false', 'message': 'Product Does Not Exist', 'result': []})

        if serializer.is_valid():
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


# LIST A SINGLE CUSTOMER ORDERS DETAIL / UPDATE / DELETE

@api_view(['GET', 'PUT', 'DELETE'])
def order_details(request, id):

    try:
        user = request.user
        order = Order.objects.filter(owner=user).get(pk=id)

    except Order.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'message': 'Request not found'})

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        order.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


# LIST ALL CUSTOMER ORDERS / CREATE A CUSTOMER ORDER

@api_view(['GET', 'POST'])
def receipt_list(request):
    if request.method == 'GET':
        user = request.user
        order = Order.objects.filter(owner=user).filter(type="receipt")
        orderList = []
        for item in order.iterator():
            productList = []
            price = 0
            productsOrders = OrderProducts.objects.filter(order_id=item.id)

            for productsOrdersItem in productsOrders.iterator():
                aProduct = Product.objects.get(
                    id=productsOrdersItem.product_id)
                productList.append({
                    "id": aProduct.id,
                    "name": aProduct.name,
                    "description_color": aProduct.description_color,
                    "price": aProduct.price,
                    "quantity": productsOrdersItem.quantity,
                    "amount": aProduct.price * productsOrdersItem.quantity
                })
                price = price + (aProduct.price * productsOrdersItem.quantity)

            orderList.append(
                {
                    "id": item.id,
                    "buyer": item.buyer,
                    "products": productList,
                    "status": item.status,
                    "receipt":  item.receipt,
                    "type": item.type,
                    "total_price":  price,
                },
            )
        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        data = request.data
        user = request.user
        new_order = Order.objects.create(
            owner=user, buyer=data["buyer"], status=data["status"], receipt=data["receipt"], type=data["type"], total_price=data["total_price"])
        new_order.save()

        for product in data['products']:
            new_product_order = OrderProducts.objects.create(
                product_id=product['id'],  order_id=new_order.id, quantity=product['amount'])
            new_product_order.save()

            try:
                aproduct = Product.objects.get(pk=product['id'])
                if (aproduct.stock - product['amount'] < 0):
                    new_order.delete()
                    return JsonResponse(status=status.HTTP_422_UNPROCESSABLE_ENTITY,  data={'status': 'false', 'message':  'Product Out Of Stock Error', 'result': []})
                else:
                    aproduct.stock = aproduct.stock - product['amount']
                    aproduct.save()
            except Product.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'false', 'message': 'Product Does Not Exist', 'result': []})

        if serializer.is_valid():
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


# LIST A SINGLE CUSTOMER ORDERS DETAIL / UPDATE / DELETE

@api_view(['GET', 'PUT', 'DELETE'])
def receipt_details(request, id):

    try:
        user = request.user
        order = Order.objects.filter(owner=user).get(pk=id)

    except Order.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'message': 'Request not found'})

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        order.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


# LIST ALL CUSTOMER INVOICES / CREATE A CUSTOMER INVOICE

@api_view(['GET', 'POST'])
def invoice_list(request):
    if request.method == 'GET':
        user = request.user
        order = Order.objects.filter(owner=user).filter(type="invoice")
        orderList = []
        for item in order.iterator():
            productList = []
            price = 0
            productsOrders = OrderProducts.objects.filter(order_id=item.id)

            for productsOrdersItem in productsOrders.iterator():
                aProduct = Product.objects.get(
                    id=productsOrdersItem.product_id)
                productList.append({
                    "id": aProduct.id,
                    "name": aProduct.name,
                    "description_color": aProduct.description_color,
                    "price": aProduct.price,
                    "quantity": productsOrdersItem.quantity,
                    "amount": aProduct.price * productsOrdersItem.quantity
                })
                price = price + (aProduct.price * productsOrdersItem.quantity)

            orderList.append(
                {
                    "id": item.id,
                    "buyer": item.buyer,
                    "products": productList,
                    "status": item.status,
                    "receipt":  item.receipt,
                    "type": item.type,
                    "total_price":  price,
                },
            )
        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        data = request.data
        user = request.user
        new_order = Order.objects.create(
            owner=user, buyer=data["buyer"], status=data["status"], receipt=data["receipt"], type=data["type"], total_price=data["total_price"])
        new_order.save()

        for product in data['products']:
            new_product_order = OrderProducts.objects.create(
                product_id=product['id'],  order_id=new_order.id, quantity=product['amount'])
            new_product_order.save()

            try:
                aproduct = Product.objects.get(pk=product['id'])
                print(aproduct.stock)
                print(product['amount'])
                print(aproduct.stock - product['amount'])

                if ((aproduct.stock - product['amount']) < 0):
                    new_order.delete()
                    return JsonResponse(status=status.HTTP_422_UNPROCESSABLE_ENTITY,  data={'status': 'false', 'message':  'Product Out Of Stock Error', 'result': []})
                else:
                    aproduct.save()
            except Product.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'false', 'message': 'Product Does Not Exist', 'result': []})

        if serializer.is_valid():
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


# LIST A SINGLE CUSTOMER ORDERS DETAIL / UPDATE / DELETE

@api_view(['GET', 'PUT', 'DELETE'])
def invoice_details(request, id):

    try:
        user = request.user
        order = Order.objects.filter(owner=user).get(pk=id)

    except Order.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'message': 'Request not found'})

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        order.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


# API FOR COUNTS

@api_view(['GET'])
def orderCounts(request):
    user = request.user
    order_count = Order.objects.filter(
        owner=user).filter(type='receipt').count()
    total = Order.objects.filter(owner=user).filter(
        type='receipt').aggregate(TOTAL=Sum('total_price'))['TOTAL']
    order = Order.objects.filter(owner=user).filter(type='receipt')
    price = 0
    for item in order.iterator():
        productsOrders = OrderProducts.objects.filter(order_id=item.id)
        for productsOrdersItem in productsOrders.iterator():
            aProduct = Product.objects.get(id=productsOrdersItem.product_id)
            price = price + (aProduct.price * productsOrdersItem.quantity)

    orderMonthList = []
    for x in range(1, 13):
        count = Order.objects.filter(
            owner=user, created_date__month__exact=x, type='receipt').count()
        orderMonthList.append(
            count
        )

    from django.utils import timezone
    totalpreviousyearPrice = Order.objects.filter(created_date__year__exact=timezone.now(
    ).year - 1, type='receipt').aggregate(TOTAL=Sum('total_price'))['TOTAL']
    totalcurrentyearPrice = Order.objects.filter(created_date__year__exact=timezone.now(
    ).year, type='receipt').aggregate(TOTAL=Sum('total_price'))['TOTAL']

    try:
        percentagePrevious = round(
            ((totalcurrentyearPrice - totalpreviousyearPrice) / 100)*100)
    except:
        percentagePrevious = 0

    categoryAmountSoldList = []

    categories = Category.objects.filter(owner=user)
    for categoryItem in categories.iterator():

        amountQuantity = 0
        categoryname = categoryItem.name
        categoryAmountSoldList.append({
            "categoryName": categoryItem.name,
            "amount":  0
        })

        myorder = Order.objects.filter(owner=user, type='receipt')
        for orderitems in myorder.iterator():
            productQuantity = OrderProducts.objects.filter(
                order_id=orderitems.id)
            for oneproductQuantityRow in productQuantity.iterator():
                category = Product.objects.get(
                    id=oneproductQuantityRow.product_id)
                if (categoryItem.id == category.category_id):
                    amountQuantity = amountQuantity + oneproductQuantityRow.quantity

            for itemcategoryAmountSoldList in categoryAmountSoldList:
                if categoryname == itemcategoryAmountSoldList["categoryName"]:
                    itemcategoryAmountSoldList["amount"] = amountQuantity

    result = {'ordercount': order_count,
              "total": price,
              'monthlyOrders': orderMonthList,
              'percentageIncrement': percentagePrevious,
              'categoryStockSold': categoryAmountSoldList
              }
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': result})


@api_view(['GET'])
def productCounts(request):
    user = request.user
    product_count = Product.objects.filter(owner=user).count()
    result = {'productcount': product_count}
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': result})


@api_view(['GET'])
def buyerCounts(request):
    buyer_count = Buyer.objects.all().count()
    result = {'buyercount': buyer_count}
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': result})


@api_view(['GET'])
def supplierCounts(request):
    supplier_count = Supplier.objects.all().count()
    result = {'suppliercount': supplier_count}
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': result})


@api_view(['GET'])
def deliveryCounts(request):
    delivery_count = Delivery.objects.all().count()
    deliveries = {'deliverycount': delivery_count}
    return JsonResponse(deliveries)


@api_view(['GET'])
def total_orders(request):
    total = Order.objects.all().aggregate(TOTAL=Sum('total_price'))['TOTAL']
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': total})


@api_view(['GET'])
def total_stock(request):
    total = Product.objects.all().aggregate(TOTAL=Sum('stock'))['TOTAL']
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': total})


@api_view(['GET'])
def total_price(request):
    total = Product.objects.all().aggregate(TOTAL=Sum('price'))['TOTAL']
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': total})


@api_view(['GET'])
def categoryProducts(request, id):
    category = Category.objects.filter(owner=request.user, pk=id)
    categoryList = []

    for item in category.iterator():
        categoryname = item.name
        productList = []

        products = Product.objects.filter(category_id=item.id)

        for productItem in products.iterator():
            productList.append({
                "name": productItem.name,
                "stock":  productItem.stock
            })

        categoryList.append({
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "products": productList
        })

    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': categoryList})
