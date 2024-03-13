from django.conf import settings
from twilio.rest import Client
from django.http import JsonResponse
from django.http import HttpResponse
from django.db import Error
from django.db.models import Sum
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from rest_framework.views import APIView
from .models import Product, Category, Damages, OrderProducts, Supplier, Buyer, Order, Delivery, StoreActivity
from .serializers import ProductSerializer,ProductEditSerializer, CategorySerializer, BuyerSerializer, DamagesSerializer, OrderSerializer, StoreActivitySerializer
from users.models import CustomUser

# FORM DATA FOR PRODUCT IMAGE
parser_classes = [MultiPartParser, FormParser]

# TWILIO
account_sid = '12334'
authToken = '14456'
client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)


@csrf_exempt
def twilio(request):
    # message = request.POST["message"]
    client.messages.create(
        from_='+16592700879',
        body="Hi",
        # media_url='https://www.aims.ca/site/media/aims/2.pdf',
        # media_url='https://91d7-197-255-199-14.eu.ngrok.io/static/images/gooo.pdf',
        to='+2207677435',
    )
    print(request.POST)
    return HttpResponse("Hello")


# LIST ALL CUSTOMER PRODUCT CATEGORIES / CREATE A PRODUCT CATEGORY
class CategoryListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Category.objects.filter(owner=user)
        serializer = self.get_serializer(queryset, many=True)
        response = {
            "status": True,
            "message": "Valid request",
            "categories": serializer.data

        }
        return Response(response)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        category_name = request.data.get('name')

        if Category.objects.filter(name=category_name, owner=self.request.user).exists():
            return Response(
                data={"status": False, "message": "Category Already Exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )
           
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                data={"status": True, "message": "Category Successfully Added"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                data={"status": False, "message": "Invalid data"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# LIST DETAIL OF ONE CATEGORY / UPDATE / DELETE
class CategoryRetreiveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Category.objects.filter(owner=user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            "status": True,
            "message": "",
            "category": serializer.data

        }
        return Response(data=response, status=status.HTTP_201_CREATED)


# LIST ALL CUSTOMER PRODUCTS / CREATE A PRODUCT
class ProductListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(owner=user)

    

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Product.objects.filter(owner=user, is_active=True)
        serializer = self.get_serializer(queryset, many=True)
        response = {
            "status": True,
            "message": "",
            "products": serializer.data

        }
        return Response(response)

    def get_serializer(self, *args, **kwargs):
        kwargs['user'] = self.request.user
        return super().get_serializer(*args, **kwargs)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response = {
            "status": True,
            "message": "Product Successfully Added",
        }
        return Response(data=response, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# LIST DETAIL OF ONE PRODUCT / UPDATE / DELETE
class ProductRetreiveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductEditSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(owner=user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            "status": True,
            "message": "",
            "product": serializer.data

        }
        return Response(data=response, status=status.HTTP_201_CREATED)


class ProductImagesListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        product_images = Product.objects.filter(
            owner=user).values_list('image', flat=True)
        images = list(set(product_images))
        images.append('products/inventory.jpg')
        response = {
            "status": True,
            "message": "Success",
            "images": images

        }
        return Response(response)


# LIST ALL SUBSCRIBER BUYERS / CREATE A BUYER
class BuyerListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = BuyerSerializer
    queryset = Buyer.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Buyer.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Buyer.objects.filter(owner=user)
        serializer = self.get_serializer(queryset, many=True)
        response = {
            "status": True,
            "message": "",
            "buyers": serializer.data

        }
        return Response(response)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        response = {
            "status": True,
            "message": "Buyer Successfully Added",
        }
        return Response(data=response, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# LIST ALL SUBSCRIBER BUYER ORDERS [INVOICE/RECEIPT] 
class BuyerOrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        type = self.request.query_params.get('type')
        buyer = self.request.query_params.get('buyer')

        if (buyer == None):
            response = {
                "status": True,
                "message": "Buyer Does Not Exist"
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        else:
            queryset = Order.objects.filter(owner=user).filter(buyer=buyer).filter(type=type)
           

        orderList = []
        for item in queryset.iterator():
            productList = []
            price = 0
            productOrders = OrderProducts.objects.filter(order_id=item.id)

            for productsOrdersItem in productOrders.iterator():
                iProduct = Product.objects.get(
                    id=productsOrdersItem.product_id)
                productList.append({
                    "id": iProduct.id,
                    "name": iProduct.name,
                    "description_color": iProduct.description_color,
                    "price": iProduct.price,
                    "quantity": productsOrdersItem.quantity,
                    "amount": iProduct.price * productsOrdersItem.quantity
                })

                price = price + (iProduct.price * productsOrdersItem.quantity)

            orderList.append(
                {
                    "id": item.id,
                    "buyer": item.buyer,
                    "buyer_location": item.buyer_location,
                    "products": productList,
                    "status": item.status,
                    "receipt":  item.ref,
                    "type": item.type,
                    "buyer_phone": item.buyer_phone,
                    "total_price":  price,
                    "price_paid":  item.price_paid,
                },
            )

        response = {
            "status": True,
            "message": "",
            "orders": orderList
        }
        return Response(response)


# LIST ALL CUSTOMER PRODUCT CATEGORIES / CREATE A PRODUCT CATEGORY
class DamagesListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DamagesSerializer
    queryset = Damages.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Damages.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Damages.objects.filter(owner=user)
        serializer = self.get_serializer(queryset, many=True)
        response = {
            "status": True,
            "message": "",
            "damages": serializer.data

        }
        return Response(response)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = request.data

        try:
            iproduct = Product.objects.get(name=data['product'])
            if (iproduct.stock - int(data['damages']) < 0):
                response = {
                    "status": True,
                    "message": "Damages is more than Of Stock Error",
                }
                return Response(data=response, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                serializer = ProductSerializer(
                    iproduct, data={'stock': iproduct.stock - int(data['damages'])}, partial=True)
                damages = Damages.objects.create(
                    owner=request.user, product=iproduct, category=data["category"], damages=data["damages"])
                damages.save()

                if serializer.is_valid():
                    serializer.save()
                    response = {
                        "status": True,
                        "message": "Damages Successfully Added",
                    }
                    return Response(data=response, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            response = {
                "status": True,
                "message": "Product Does Not Existr"
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# LIST ALL CUSTOMER ORDERS [INVOICE/RECEIPT] / CREATE A CUSTOMER ORDER
class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        type = self.request.query_params.get('type')

        if (type == None):
            queryset = Order.objects.filter(owner=user)
        else:
            queryset = Order.objects.filter(owner=user).filter(type=type)

        orderList = []
        for item in queryset.iterator():
            productList = []
            price = 0
            productOrders = OrderProducts.objects.filter(order_id=item.id)

            for productsOrdersItem in productOrders.iterator():
                iProduct = Product.objects.get(
                    id=productsOrdersItem.product_id)
                productList.append({
                    "id": iProduct.id,
                    "name": iProduct.name,
                    "description_color": iProduct.description_color,
                    "price": iProduct.price,
                    "quantity": productsOrdersItem.quantity,
                    "amount": iProduct.price * productsOrdersItem.quantity
                })

                price = price + (iProduct.price * productsOrdersItem.quantity)

            orderList.append(
                {
                    "id": item.id,
                    "buyer": item.buyer,
                    "buyer_location": item.buyer_location,
                    "products": productList,
                    "status": item.status,
                    "receipt":  item.ref,
                    "type": item.type,
                    "buyer_phone": item.buyer_phone,
                    "total_price":  price,
                    "price_paid":  item.price_paid,
                },
            )

        response = {
            "status": True,
            "message": "",
            "orders": orderList
        }
        return Response(response)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = request.data
        type = self.request.query_params.get('type')
        order = Order.objects.create(owner=request.user, buyer=data["buyer"], buyer_location=data["buyer_location"],
                                     buyer_phone=data["buyer_phone"], status=data["status"], ref=data["ref"], type=data["type"], total_price=data["total_price"])
        order.save()

        try:
            for product in data['products']:
                iproductstock = Product.objects.get(pk=product['id']).stock

                if (iproductstock - int(product['amount']) < 0):
                    order.delete()
                    response = {
                        "status": True,
                        "message": "Product Is Out Of Stock Error",
                    }
                    return Response(data=response, status=status.HTTP_404_NOT_FOUND)

                orderProduct = OrderProducts.objects.create(
                    product_id=product['id'],  order_id=order.id, quantity=product['amount'])

                if (type == 'receipt'):
                    theproduct = Product.objects.get(pk=product['id'])
                    theproduct.save()

                orderProduct.save()

            response = {
                "status": True,
                "message": "Order Successfully Added",
            }
            return Response(data=response, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            order.delete()
            response = {
                "status": True,
                "message": "Product Does Not Existr"
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        except Error:
            order.delete()
            response = {
                "status": True,
                "message": "Order Could Not Be Added, Contact Admin"
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# LIST DETAIL OF ONE PRODUCT / UPDATE / DELETE
class OrderRetreiveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(owner=user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            "status": True,
            "message": "",
            "order": serializer.data
        }
        return Response(data=response, status=status.HTTP_201_CREATED)

    def patch(self, request,  *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        instance.type = data['type']
        instance.status = data['status']

        # PART PAYMENT
        if 'price_paid' in request.data:
            if (instance.total_price > (float(instance.price_paid) + float(data['price_paid']))):
                instance.price_paid = float(
                    instance.price_paid) + float(data['price_paid'])

            elif (instance.total_price == (float(instance.price_paid) + float(data['price_paid']))):
                instance.price_paid = float(
                    instance.price_paid) + float(data['price_paid'])
                instance.type = 'receipt'

            else:
                response = {
                    "status": False,
                    "message": "Updated UnSuccessful: Price Irregularities",
                    "order": instance.id,
                }
                return Response(data=response, status=status.HTTP_400_BAD_REQUEST)

        # APPROVING AS RECEIPT
        if (data['type'] == "receipt"):
            instance.price_paid = instance.total_price

        # SAVE ORDER
        instance.save()

        productOrders = OrderProducts.objects.filter(order_id=instance.id)
        for productsOrdersItem in productOrders.iterator():
            productsOrdersItem.delete()
        try:
            for product in data['products']:
                iproductstock = Product.objects.get(pk=product['id']).stock

                if (iproductstock - int(product['amount']) < 0):
                    if (data['type'] == 'invoice'):
                        response = {
                            "status": True,
                            "message": "Product Is Out Of Stock Error",
                        }
                        return Response(data=response, status=status.HTTP_406_NOT_ACCEPTABLE)

                orderProduct = OrderProducts.objects.create(
                    product_id=product['id'],  order_id=instance.id, quantity=product['amount'])

                if (data['type'] == 'receipt'):
                    theproduct = Product.objects.get(pk=product['id'])
                    theproduct.stock = theproduct.stock - \
                        int(product['amount'])
                    theproduct.save()

        except Product.DoesNotExist:
            response = {
                "status": True,
                "message": "Product Does Not Exist",
            }
            return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        response = {
            "status": True,
            "message": "Updated Successfully",
            "order": instance.id,
        }
        return Response(data=response, status=status.HTTP_201_CREATED)


    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# LIST ALL CUSTOMER ORDERS [INVOICE/RECEIPT] / CREATE A CUSTOMER ORDER
class StoreStatisticsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        total_invoice = Order.objects.filter(owner=user).filter(
            type='invoice').aggregate(TOTAL=Sum('total_price'))['TOTAL']
        total_invoice_partyly_paid = Order.objects.filter(owner=user).filter(
            type='invoice').aggregate(TOTAL=Sum('price_paid'))['TOTAL']

        total_receipt = Order.objects.filter(owner=user).filter(
            type='receipt').aggregate(TOTAL=Sum('total_price'))['TOTAL']
        number_of_categories = Category.objects.filter(owner=user).count()

        stock_current = 0
        products = Product.objects.filter(owner=user)
        for iproduct in products.iterator():
            stock_current = stock_current + iproduct.stock

        stock_out = 0
        damagesnumber = 0
        orders = Order.objects.filter(owner=user).filter(type='receipt')
        for item in orders.iterator():
            productOrders = OrderProducts.objects.filter(order_id=item.id)

            for productOrdersItem in productOrders.iterator():
                stock_out = stock_out + productOrdersItem.quantity

                damages = Damages.objects.filter(
                    product_id=productOrdersItem.product_id)
                for damage in damages.iterator():
                    damagesnumber = damagesnumber + damage.damages

        number_of_damages = 0
        damages = Damages.objects.filter(owner=user)
        for item in damages.iterator():
            number_of_damages = number_of_damages + item.damages

        stock_in = stock_current + stock_out + number_of_damages

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

            myorder = Order.objects.filter(owner=user).filter(type='receipt')
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

        cash_pending = 0
        cash_inhand = 0

        if total_invoice is not None and total_invoice_partyly_paid is not None:
            cash_pending = total_invoice - total_invoice_partyly_paid

        if total_receipt is not None and total_invoice_partyly_paid is not None:
            cash_inhand = total_receipt + total_invoice_partyly_paid

        if total_receipt is not None and total_invoice_partyly_paid is None:
            cash_inhand = total_receipt

        response = {
            "status": True,
            "message": "",
            "statistics": {
                "cash_pending": cash_pending,
                "cash_inhand": cash_inhand,
                "number_of_categories": number_of_categories,
                "number_of_damages": number_of_damages,
                "stock_inhand": stock_current,
                "stock_out": stock_out,
                "stock_in": stock_in,
                "category_stat": categoryList
            }
        }
        return Response(response)


# LIST ALL ORDERS [INVOICE/RECEIPT] 
class AdminOrderListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Order.objects.all()

    def get(self, request, *args, **kwargs):
        type = self.request.query_params.get('type')

        if (type == None):
            queryset = Order.objects.all()
        else:
            queryset = Order.objects.all().filter(type=type)

        orderList = []
        for item in queryset.iterator():
            productList = []
            price = 0
            productOrders = OrderProducts.objects.filter(order_id=item.id)

            for productsOrdersItem in productOrders.iterator():
                iProduct = Product.objects.get(
                    id=productsOrdersItem.product_id)
                productList.append({
                    "id": iProduct.id,
                    "name": iProduct.name,
                    "description_color": iProduct.description_color,
                    "price": iProduct.price,
                    "quantity": productsOrdersItem.quantity,
                    "amount": iProduct.price * productsOrdersItem.quantity
                })

                price = price + (iProduct.price * productsOrdersItem.quantity)

            orderList.append(
                {
                    "id": item.id,
                    "buyer": item.buyer,
                    "buyer_location": item.buyer_location,
                    "products": productList,
                    "status": item.status,
                    "receipt":  item.ref,
                    "type": item.type,
                    "buyer_phone": item.buyer_phone,
                    "total_price":  price,
                    "price_paid":  item.price_paid,
                    "owner": item.owner.email
                },
            )

        response = {
            "status": True,
            "message": "",
            "orders": orderList
        }
        return Response(response)


# DELETE ORDER OR RECEIPT
class AdminOrderDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)



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
                    "buyer_location": item.buyer_location,
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
            owner=user, buyer=data["buyer"], buyer_location=data["buyer_location"], status=data["status"], receipt=data["receipt"], type=data["type"], total_price=data["total_price"])
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
                    "buyer_location": item.buyer_location,
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
            owner=user, buyer=data["buyer"], buyer_location=data["buyer_location"],  status=data["status"], receipt=data["receipt"], type=data["type"], total_price=data["total_price"])
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
        user = request.user.id
        order = Order.objects.filter(owner=user).filter(type="invoice")
        orderList = []
        for item in order.iterator():
            productList = []
            price = 0
            totalPending = 0

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
                    "buyer_location": item.buyer_location,
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
            owner=user, buyer=data["buyer"], buyer_location=data["buyer_location"], status=data["status"], receipt=data["receipt"], type=data["type"], total_price=data["total_price"])
        new_order.save()

        for product in data['products']:
            new_product_order = OrderProducts.objects.create(
                product_id=product['id'],  order_id=new_order.id, quantity=product['amount'])
            new_product_order.save()

            try:
                aproduct = Product.objects.get(pk=product['id'])

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
def cash_invoice(request):
    order = Order.objects.filter(type="invoice")
    totalPending = 0
    totalPending += order.all().aggregate(TOTAL=Sum('total_price'))['TOTAL']
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': totalPending})


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

# API to get products on low stock


@api_view(['GET'])
def lowstockproduct(request):
    product = Product.objects.filter()
    low_stock_products = []
    for item in product.iterator():
        if item.stock <= 5:
            low_stock_products.append({
                "id": item.id,
                "name": item.name,
                # "description": item.description,
                # "products": productList
            })
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': low_stock_products})


class ProductReportView(APIView):
    def get(self, request, *args, **kwargs):
        products = Product.objects.filter(owner=request.user)

        product_data = []
        for product in products:
            product_data.append({
                "Name": product.name,
                "Category": product.category.name if product.category else "",
                "Stock In": product.stock,
                "Stock Out": self.get_stock_out(product),
                "Stock In Hand": product.stock - self.get_stock_out(product),
                "Expiry Date": product.expiry_date.strftime('%Y-%m-%d') if product.expiry_date else "",
                "Added Date": product.created_date
            })

        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': product_data})

    def get_stock_out(self, product):
        stock_out = product.orderproducts_set.filter(
            order__type='receipt').aggregate(Sum('quantity'))['quantity__sum']
        return stock_out if stock_out else 0


# LIST STORE INFORMATION
class StoreInfoListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get(self, request, *args, **kwargs):
        num_non_staff_users = CustomUser.objects.filter(is_staff=False).count()
        response = {
            "status": True,
            "message": "Store Information",
            "info": {
                "num_of_subscribers": num_non_staff_users
            }

        }
        return Response(response)


# LIST ALL STORE ACTIVITY
class StoreActivityListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StoreActivitySerializer

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = StoreActivity.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        response = {
            "status": True,
            "message": "Valid request",
            "activities": serializer.data

        }
        return Response(response)
