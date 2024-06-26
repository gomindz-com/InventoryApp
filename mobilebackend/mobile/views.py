from django.http import JsonResponse
from django.db.models import Sum
from django.db import Error
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics
from .models import mProduct, Damages,Transaction, TransactionProducts
from .serializers import mProductSerializer, DamagesSerializer,TransactionSerializer,TransactionProductsSerializer


# FORM DATA FOR PRODUCT IMAGE
parser_classes = [MultiPartParser, FormParser]


# LIST ALL CUSTOMER PRODUCTS / CREATE A PRODUCT
class MobileProductListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = mProductSerializer
    queryset = mProduct.objects.all()

    def get_queryset(self):
        user = self.request.user
        return mProduct.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        queryset = mProduct.objects.filter(owner=user)
        serializer = self.get_serializer(queryset, many=True)
        response = {
                    "status": True,
                    "message": "",
                    "products" : serializer.data

                }
        return Response(response)
        
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
    serializer_class = mProductSerializer
    queryset = mProduct.objects.all()

    def get_queryset(self):
        user = self.request.user
        return mProduct.objects.filter(owner=user)

        

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            "status": True,
            "message": "",
            "product": serializer.data

                    }                
        return Response(data=response, status=status.HTTP_201_CREATED)

class TransactionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(owner=user)
    

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     data = request.data
    #     type = self.request.query_params.get('type')
    #     # transaction = Transaction.objects.create(owner=request.user, type=data["type"])
    #     transaction = serializer.save(owner=self.request.user )#, type=type)
    #     transaction.save()
    #     productstock = transaction.products

    #     try:
    #         # for product in data['products']:
    #             # iproductstock = mProduct.objects.get(pk=product['id']).stock

    #         # transactionProduct = TransactionProducts.objects.create(
    #         #     product_id=product['id'],  order_id=transaction.id, quantity=product['amount'])

    #         if (type == 'in'):
    #             productstock.stock += transaction.quantity
    #             productstock.save()
    #             transaction.current_stock = productstock.stock

                # theproduct = mProduct.objects.get(pk=product['id'])
                # theproduct.save()

        #     elif (type == 'out'):
        #         productstock.stock -= transaction.quantity
        #         productstock.save()
        #         transaction.current_stock = productstock.stock

        #     # transactionProduct.save()

        #     response = {
        #         "status": True,
        #         "message": "Transaction Successfully Added",
        #         # "product": serializer.data
        #     }
        #     return Response(data=response, status=status.HTTP_201_CREATED)

        # except mProduct.DoesNotExist:
        #     transaction.delete()
        #     response = {
        #         "status": True,
        #         "message": "Product Does Not Existr"
        #     }
        #     return Response(data=response, status=status.HTTP_404_NOT_FOUND)

        # except Error:
    #         transaction.delete()
    #         response = {
    #             "status": True,
    #             "message": "Transaction Could Not Be Added, Contact Admin"
    #         }
    #         return Response(data=response, status=status.HTTP_404_NOT_FOUND)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

    def perform_create(self, serializer):
        transaction = serializer.save(owner=self.request.user)
        productstock = transaction.products

        if transaction.type == 'in':
            productstock.stock += transaction.quantity
            productstock.save()
            transaction.current_stock = productstock.stock
        elif transaction.type == 'out':
            productstock.stock -= transaction.quantity
            productstock.save()
            transaction.current_stock = productstock.stock

        response = {
            "status": True,
            "message": "Transaction Successful",
            # "product": serializer.data

                    }       
        return Response(data=response, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        response = {
            "status": True,
            "message": "Success",
            "product": serializer.data

                    }       
        return Response(data=response, status=status.HTTP_201_CREATED)




# LIST ALL CUSTOMER PRODUCT THAT ARE DAMAGED
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
                    "damages" : serializer.data

                }
        return Response(response)
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        self.perform_create(serializer)
        response = {
            "status": True,
            "message": "Damages Successfully Added",
                    }                
        return Response(data=response, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



#API FOR LOW STOCK
@api_view(['GET'])
def lowstockproduct(request):
    product = mProduct.objects.filter()
    low_stock_products = []
    for item in product.iterator():
        if item.stock <= 5:  
            low_stock_products.append({
            "id": item.id,
            "name": item.name,
            })
    return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': low_stock_products}) 


# API FOR THE STOCK STATS
class StoreStatisticsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return Transaction.objects.filter(owner=user)


    def get(self, request, *args, **kwargs):
        user = self.request.user
        total_stock_in = Transaction.objects.filter(owner=user).filter(type='in').aggregate(TOTAL=Sum('quantity'))['TOTAL'] or 0
        total_stock_out = Transaction.objects.filter(owner=user).filter(type='out').aggregate(TOTAL=Sum('quantity'))['TOTAL'] or 0

        total_stock_in_hand = total_stock_in - total_stock_out


        response = {
                    "status": True,
                    "message": "",
                    "statistics" : {
                        "stock_in" : total_stock_in,
                        "stock_out" : total_stock_out,
                        "stock_inhand" : total_stock_in_hand,
                    }
                }
        return Response(response)