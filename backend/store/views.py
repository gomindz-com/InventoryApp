from math import prod
from unittest import result
from django.shortcuts import render, redirect
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .serializers import ProductSerializer, SupplierSerializer, CategorySerializer, BuyerSerializer, OrderSerializer, DeliveriesSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.db.models import Sum


from users.models import User
from .models import (
    Supplier,
    Buyer,
    Season,
    Drop,
    Product,
    Order,
    Delivery,
    Category
)
from .forms import (
    SupplierForm,
    BuyerForm,
    SeasonForm,
    DropForm,
    ProductForm,
    OrderForm,
    DeliveryForm
)

import logging
logger = logging.getLogger('app_api')


@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()

        productList = []
        for item in products.iterator():
            logger.error(item.category.id)
            aCategory = Category.objects.get(id=item.category.id)
            serializerCategory = CategorySerializer(aCategory)
            
            productList.append({
                "id": item.id,
                "name": item.name,
                "label": item.label,
                "tags": item.tags,
                "price": item.price,
                "stock": item.stock,
                "status": item.status,
                "sortno": item.sortno,
                "images": item.images,
                "category": serializerCategory.data,
                
            })


        serializer = ProductSerializer(products, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': productList})

    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def product_details(request, id):

    try:
        product = Product.objects.get(pk=id)

    except Product.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'true', 'message': 'Product Does Not Exist', 'result': []})

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        product.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


@api_view(['GET', 'POST'])
def delivery_list(request):
    if request.method == 'GET':
        order = Order.objects.all().filter(status='approved')
        orderList = []
        for item in order.iterator():
            logger.error(item.supplier.id)
            aSupplier = Supplier.objects.get(id=item.supplier.id)
            aProduct = Product.objects.get(id=item.product.id)
            aBuyer = Buyer.objects.get(id=item.buyer.id)
            serializerSupplier = SupplierSerializer(aSupplier)
            serializerProduct = ProductSerializer(aProduct)
            serializerBuyer = BuyerSerializer(aBuyer)
            orderList.append({
                "id": item.id,
                "supplier": serializerSupplier.data,
                "product": serializerProduct.data,
                "buyer": serializerBuyer.data,
                "status": item.status,
                "amount": item.amount,
                "total_price": item.total_price,
                "receipt": item.receipt
            })

        logger.info("orderList")
        logger.info(orderList)
        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = DeliveriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})


@api_view(['GET', 'PUT', 'DELETE'])
def delivery_details(request, id):

    try:
        delivery = Delivery.objects.get(pk=id)

    except Delivery.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'message': 'Request not found'})

    if request.method == 'GET':
        serializer = DeliveriesSerializer(delivery)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = DeliveriesSerializer(delivery, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        delivery.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


@api_view(['GET', 'POST'])
def supplier_list(request):
    if request.method == 'GET':
        supplier = Supplier.objects.all()
        serializer = SupplierSerializer(supplier, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    if request.method == 'POST':
        serializer = SupplierSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def supplier_details(request, id):

    try:
        supplier = Supplier.objects.get(pk=id)

    except Supplier.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'true', 'message': 'Supplier Does Not Exist', 'result': []})

    if request.method == 'GET':
        serializer = SupplierSerializer(supplier)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = SupplierSerializer(supplier, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        supplier.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


@api_view(['GET', 'POST'])
def buyer_list(request):
    if request.method == 'GET':
        buyer = Buyer.objects.all()
        serializer = BuyerSerializer(buyer, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    if request.method == 'POST':
        serializer = BuyerSerializer(data=request.data)
        if serializer.is_valid():

            serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def buyer_details(request, id):

    try:
        buyer = Buyer.objects.get(pk=id)

    except Buyer.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'message': 'Request not found'})

    if request.method == 'GET':
        serializer = BuyerSerializer(buyer)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = BuyerSerializer(buyer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request'})

    elif request.method == 'DELETE':
        buyer.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})


@api_view(['GET', 'POST'])
def order_list(request):
    if request.method == 'GET':
        order = Order.objects.all()
        orderList = []
        for item in order.iterator():
            logger.error(item.supplier.id)
            aSupplier = Supplier.objects.get(id=item.supplier.id)
            aProduct = Product.objects.get(id=item.product.id)
            aBuyer = Buyer.objects.get(id=item.buyer.id)
            serializerSupplier = SupplierSerializer(aSupplier)
            serializerProduct = ProductSerializer(aProduct)
            serializerBuyer = BuyerSerializer(aBuyer)
            orderList.append({
                "id": item.id,
                "supplier": serializerSupplier.data,
                "product": serializerProduct.data,
                "buyer": serializerBuyer.data,
                "status": item.status,
                "amount": item.amount,
                "total_price": item.total_price,
                "receipt": item.receipt
            })

        logger.info("orderList")
        logger.info(orderList)
        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def order_details(request, id):

    try:
        order = Order.objects.get(pk=id)

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
    

@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return JsonResponse(status=200, data={'status':'true','message':'success', 'result': serializer.data})

    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            
            serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status':'true','message':'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status':'false','message':'Bad Request'})

        
        
@api_view(['GET', 'PUT', 'DELETE'])
def category_details(request, id):

    try:
        category = Category.objects.get(pk=id)

    except Category.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'message':'Request not found'})

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return JsonResponse(status=200, data={'status':'true','message':'success', 'result': serializer.data})

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(status=200, data={'status':'true','message':'success', 'result': serializer.data})
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST, data={'status':'false','message':'Bad Request'})
    
    elif request.method == 'DELETE':
        category.delete()
        return JsonResponse(status=status.HTTP_200_OK, data={'status': 'true', 'message': 'success'})  
    


  
# create api for the count of the models

@api_view(['GET'])
def buyerCounts(request):
  buyer_count = Buyer.objects.all().count()
  result= {'buyercount': buyer_count}
  return JsonResponse(status=200, data={'status':'true','message':'success', 'result': result})


@api_view(['GET'])
def supplierCounts(request):
  supplier_count = Supplier.objects.all().count()
  result= {'suppliercount': supplier_count}
  return JsonResponse(status=200, data={'status':'true','message':'success', 'result': result})


@api_view(['GET'])
def productCounts(request):
  product_count = Product.objects.all().count()
  result= {'productcount': product_count}
  return JsonResponse(status=200, data={'status':'true','message':'success', 'result': result})

@api_view(['GET'])
def orderCounts(request):
  order_count = Order.objects.all().count()
  result= {'ordercount': order_count}
  return JsonResponse(status=200, data={'status':'true','message':'success', 'result': result})

@api_view(['GET'])
def deliveryCounts(request):
  delivery_count = Delivery.objects.all().count()
  deliveries= {'deliverycount': delivery_count}
  return JsonResponse(deliveries)


# create api for the TOTAL amount for orders, product prices and product stock

@api_view(['GET'])
def total_orders(request):
    total = Order.objects.all().aggregate(TOTAL = Sum('total_price'))['TOTAL']
    return JsonResponse(status=200, data={'status':'true','message':'success', 'result': total})

@api_view(['GET'])
def total_stock(request):
    total = Product.objects.all().aggregate(TOTAL = Sum('stock'))['TOTAL']
    return JsonResponse(status=200, data={'status':'true','message':'success', 'result': total})

@api_view(['GET'])
def total_price(request):
    total = Product.objects.all().aggregate(TOTAL = Sum('price'))['TOTAL']
    return JsonResponse(status=200, data={'status':'true','message':'success', 'result': total})
    
    

# Supplier views

@login_required(login_url='login')
def create_supplier(request):
    forms = SupplierForm()
    if request.method == 'POST':
        forms = SupplierForm(request.POST)
        if forms.is_valid():
            name = forms.cleaned_data['name']
            address = forms.cleaned_data['address']
            email = forms.cleaned_data['email']
            username = forms.cleaned_data['username']
            password = forms.cleaned_data['password']
            retype_password = forms.cleaned_data['retype_password']
            if password == retype_password:
                user = User.objects.create_user(
                    username=username, password=password,
                    email=email, is_supplier=True
                )
                Supplier.objects.create(user=user, name=name, address=address)
                return redirect('supplier-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_supplier.html', context)


class SupplierListView(ListView):
    model = Supplier
    template_name = 'store/supplier_list.html'
    context_object_name = 'supplier'


# Buyer views
@login_required(login_url='login')
def create_buyer(request):
    forms = BuyerForm()
    if request.method == 'POST':
        forms = BuyerForm(request.POST)
        if forms.is_valid():
            name = forms.cleaned_data['name']
            address = forms.cleaned_data['address']
            email = forms.cleaned_data['email']
            username = forms.cleaned_data['username']
            password = forms.cleaned_data['password']
            retype_password = forms.cleaned_data['retype_password']
            if password == retype_password:
                user = User.objects.create_user(
                    username=username, password=password,
                    email=email, is_buyer=True
                )
                Buyer.objects.create(user=user, name=name, address=address)
                return redirect('buyer-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_buyer.html', context)


class BuyerListView(ListView):
    model = Buyer
    template_name = 'store/buyer_list.html'
    context_object_name = 'buyer'


# Season views
@login_required(login_url='login')
def create_season(request):
    forms = SeasonForm()
    if request.method == 'POST':
        forms = SeasonForm(request.POST)
        if forms.is_valid():
            forms.save()
            return redirect('season-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_season.html', context)


class SeasonListView(ListView):
    model = Season
    template_name = 'store/season_list.html'
    context_object_name = 'season'


# Drop views
@login_required(login_url='login')
def create_drop(request):
    forms = DropForm()
    if request.method == 'POST':
        forms = DropForm(request.POST)
        if forms.is_valid():
            forms.save()
            return redirect('drop-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_drop.html', context)


class DropListView(ListView):
    model = Drop
    template_name = 'store/drop_list.html'
    context_object_name = 'drop'


# Product views
@login_required(login_url='login')
def create_product(request):
    forms = ProductForm()
    if request.method == 'POST':
        forms = ProductForm(request.POST)
        if forms.is_valid():
            forms.save()
            return redirect('product-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_product.html', context)


class ProductListView(ListView):
    model = Product
    template_name = 'store/product_list.html'
    context_object_name = 'product'


# Order views
@login_required(login_url='login')
def create_order(request):
    forms = OrderForm()
    if request.method == 'POST':
        forms = OrderForm(request.POST)
        if forms.is_valid():
            supplier = forms.cleaned_data['supplier']
            product = forms.cleaned_data['product']
            design = forms.cleaned_data['design']
            color = forms.cleaned_data['color']
            buyer = forms.cleaned_data['buyer']
            season = forms.cleaned_data['season']
            drop = forms.cleaned_data['drop']
            Order.objects.create(
                supplier=supplier,
                product=product,
                design=design,
                color=color,
                buyer=buyer,
                season=season,
                drop=drop,
                status='pending'
            )
            return redirect('order-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_order.html', context)


class OrderListView(ListView):
    model = Order
    template_name = 'store/order_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['order'] = Order.objects.all().order_by('-id')
        return context


# Delivery views
@login_required(login_url='login')
def create_delivery(request):
    forms = DeliveryForm()
    if request.method == 'POST':
        forms = DeliveryForm(request.POST)
        if forms.is_valid():
            forms.save()
            return redirect('delivery-list')
    context = {
        'form': forms
    }
    return render(request, 'store/create_delivery.html', context)


class DeliveryListView(ListView):
    model = Delivery
    template_name = 'store/delivery_list.html'
    context_object_name = 'delivery'
