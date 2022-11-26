from ast import Or
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
from users.serializers import UserSerializer
from .models import (
    ProductQuantity,
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
        #GET THE NUMBER OF ORDERS
        order = Order.objects.filter().exclude(type="invoice")
        orderList = []
        for item in order.iterator():
            productList = []
            #FOR EACH ORDER, GO TO THE PRODUCTS ORDER TABLE TO GET THE FOREIGN KEY ID 
            logger.info(item.id)
            price = 0
            productsOrders = ProductQuantity.objects.filter(order_id=item.id)
            for productsOrdersItem in productsOrders.iterator():
                #FROM THE ORDERS, GET THE PRODUCT ID FOR EACH ORDER 
                logger.info(productsOrdersItem.product_id)
                aProduct = Product.objects.get(id=productsOrdersItem.product_id)
                productList.append( {
                        "id": aProduct.id,
                        "name": aProduct.name,
                        "label": aProduct.label,
                        "price": aProduct.price,
                        "quantity": productsOrdersItem.product_quantity,
                        "amount": aProduct.price * productsOrdersItem.product_quantity
                    })
                price = price + (aProduct.price * productsOrdersItem.product_quantity)
            #logger.info("productList")
            #logger.info(productList)
            orderList.append(
                    {
                        "id": item.id,
                        "buyer": item.buyer,
                        "products": productList,
                        "status": item.status,
                        "receipt":  item.receipt,
                        "type":item.type,
                        "total_price":  price,
                    },
                )
            logger.info("orderList")
            logger.info(orderList)

        

        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        data = request.data
        new_order = Order.objects.create(buyer = data["buyer"], status = data["status"], receipt = data["receipt"], type = data["type"], total_price = data["total_price"]  )
        new_order.save()

        for product in data['products']:    
            new_product_order = ProductQuantity.objects.create(product_id = product['id'],  order_id = new_order.id, product_quantity = product['amount'])
            new_product_order.save()

            try:
                aproduct = Product.objects.get(pk=product['id'])
                aproduct.stock = aproduct.stock - product['amount']
                logger.info("aproduct.stock - product['amount']")
                logger.info(aproduct.stock - product['amount'])
                if(aproduct.stock - product['amount'] < 0):
                    new_order.delete()
                    return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'false', 'message':  'One of the Product Is Out Of Stock', 'result': []})
                else:
                    aproduct.save()
            except Product.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'false', 'message': 'Product Does Not Exist', 'result': []})

        if serializer.is_valid():
            #serializer.save()
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
def invoice_list(request):
    if request.method == 'GET':
        #GET THE NUMBER OF ORDERS
        order = Order.objects.filter(type='invoice')
        orderList = []
        for item in order.iterator():
            productList = []
            #FOR EACH ORDER, GO TO THE PRODUCTS ORDER TABLE TO GET THE FOREIGN KEY ID 
            logger.info(item.id)
            price = 0
            productsOrders = ProductQuantity.objects.filter(order_id=item.id)
            for productsOrdersItem in productsOrders.iterator():
                #FROM THE ORDERS, GET THE PRODUCT ID FOR EACH ORDER 
                logger.info(productsOrdersItem.product_id)
                aProduct = Product.objects.get(id=productsOrdersItem.product_id)
                productList.append( {
                        "id": aProduct.id,
                        "name": aProduct.name,
                        "label": aProduct.label,
                        "price": aProduct.price,
                        "quantity": productsOrdersItem.product_quantity,
                        "amount": aProduct.price * productsOrdersItem.product_quantity
                    })
                price = price + (aProduct.price * productsOrdersItem.product_quantity)
            #logger.info("productList")
            #logger.info(productList)
            orderList.append(
                    {
                        "id": item.id,
                        "buyer": item.buyer,
                        "products": productList,
                        "status": item.status,
                        "receipt":  item.receipt,
                        "total_price":  price,
                    },
                )
            logger.info("orderList")
            logger.info(orderList)

        

        serializer = OrderSerializer(order, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': orderList})

    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        data = request.data
        new_order = Order.objects.create(buyer = data["buyer"], status = data["status"])
        new_order.save()

        for product in data['products']:    
            new_product_order = ProductQuantity.objects.create(product_id = product['id'],  order_id = new_order.id, product_quantity = product['amount'])
            new_product_order.save()

            try:
                aproduct = Product.objects.get(pk=product['id'])
                aproduct.stock = aproduct.stock - product['amount']
                aproduct.save()
            except Product.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND,  data={'status': 'true', 'message': 'Product Does Not Exist', 'result': []})

        if serializer.is_valid():
            #serializer.save()
            return JsonResponse(status=status.HTTP_201_CREATED, data={'status': 'true', 'message': 'success', 'result': serializer.data})
        else:
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST, data={'status': 'false', 'message': 'Bad Request', 'result': serializer.errors})


@api_view(['GET', 'PUT', 'DELETE'])
def invoice_details(request, id):

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
        categoryList = []
        categoryAmountSoldList = []
        
        for item in category.iterator():

            amountQuantity = 0
            logger.info("CATEGORY UNIT")
            logger.info(item.name)
            categoryname = item.name
            categoryAmountSoldList.append({
                    "categoryName" : item.name,
                    "amount" :  0
                })
                

            myorder = Order.objects.all()
            for orderitems in myorder.iterator():
                productQuantity = ProductQuantity.objects.filter(order_id=orderitems.id)
                for oneproductQuantityRow in productQuantity.iterator():
                        #GET THE CATEGORY ID OF THE CURRENT PRODUCT FROM THE PRODUCT ID IN THE PRODUCT QUANTITY TABLE
                    category = Product.objects.get(id=oneproductQuantityRow.product_id)
                    
                    if(item.id == category.category_id):
                            amountQuantity = amountQuantity + oneproductQuantityRow.product_quantity
                        
                        
            for itemcategoryAmountSoldList in categoryAmountSoldList:
                    
                logger.info("itemcategoryAmountSoldList")
                logger.info(itemcategoryAmountSoldList["categoryName"])
                if categoryname == itemcategoryAmountSoldList["categoryName"]:
                    itemcategoryAmountSoldList["amount"]= amountQuantity

            logger.info(amountQuantity)
                
            logger.info(categoryAmountSoldList)








            stock = 0
            aproduct = Product.objects.filter(category_id=item.id)
            for productItem in aproduct.iterator():
                logger.info(productItem.stock)
                stock = stock + productItem.stock 
                logger.info(stock)

            categoryList.append({
                        "id": item.id,
                        "name": item.name,
                        "description": item.description,
                        "stock": stock,
                        "amount": amountQuantity
                    })
            

        serializer = CategorySerializer(category, many=True)
        return JsonResponse(status=200, data={'status':'true','message':'success', 'result': categoryList})

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
    



# API FOR COUNTS

@api_view(['GET'])
def orderCounts(request):
  order_count = Order.objects.all().count()
  total = Order.objects.all().aggregate(TOTAL = Sum('total_price'))['TOTAL']
  
  order = Order.objects.all()
  price = 0
  amountSold = 0
  for item in order.iterator():    
    productsOrders = ProductQuantity.objects.filter(order_id=item.id)
    for productsOrdersItem in productsOrders.iterator():
        aProduct = Product.objects.get(id=productsOrdersItem.product_id)
        price = price + (aProduct.price * productsOrdersItem.product_quantity)               
       
 
  orderMonthList = []
  for x in range(1, 13):
    count = Order.objects.filter(created_date__month__exact=x).count()
    orderMonthList.append(
                    count
      )

  from django.utils import timezone
  totalpreviousyearPrice = Order.objects.filter(created_date__year__exact=timezone.now().year - 1).aggregate(TOTAL = Sum('total_price'))['TOTAL']
  totalcurrentyearPrice = Order.objects.filter(created_date__year__exact=timezone.now().year).aggregate(TOTAL = Sum('total_price'))['TOTAL']

  try:
    percentagePrevious = round(((totalcurrentyearPrice - totalpreviousyearPrice) / 100)*100)
  except:
    #print("Some variable is None")
    percentagePrevious = 0






   # CATEGORY STOCK SOLD
  logger.info("  ")
  logger.info("ORDER UNIT")
  categoryAmountSoldList = []

  categories = Category.objects.all()
  for categoryItem in categories.iterator():

    amountQuantity = 0
    logger.info("CATEGORY UNIT")
    logger.info(categoryItem.name)
    categoryname = categoryItem.name
    categoryAmountSoldList.append({
            "categoryName" : categoryItem.name,
            "amount" :  0
        })
        

    myorder = Order.objects.all()
    for orderitems in myorder.iterator():
        productQuantity = ProductQuantity.objects.filter(order_id=orderitems.id)
        for oneproductQuantityRow in productQuantity.iterator():
                #GET THE CATEGORY ID OF THE CURRENT PRODUCT FROM THE PRODUCT ID IN THE PRODUCT QUANTITY TABLE
            category = Product.objects.get(id=oneproductQuantityRow.product_id)
            
            if(categoryItem.id == category.category_id):
                    amountQuantity = amountQuantity + oneproductQuantityRow.product_quantity
                
                
        for itemcategoryAmountSoldList in categoryAmountSoldList:
                
            logger.info("itemcategoryAmountSoldList")
            logger.info(itemcategoryAmountSoldList["categoryName"])
            if categoryname == itemcategoryAmountSoldList["categoryName"]:
                itemcategoryAmountSoldList["amount"]= amountQuantity

        logger.info(amountQuantity)
            
        logger.info(categoryAmountSoldList)


        
    

    

  result= {'ordercount': order_count, 
            "total": price, 
            'monthlyOrders': orderMonthList, 
            'percentageIncrement': percentagePrevious,
            'categoryStockSold': categoryAmountSoldList
            }
  return JsonResponse(status=200, data={'status':'true','message':'success', 'result': result})



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
    
    












@api_view(['GET', 'POST'])
def customer_list(request):
    if request.method == 'GET':
        customers = User.objects.filter(is_customer=True)
        serializer = UserSerializer(customers, many=True)
        return JsonResponse(status=200, data={'status': 'true', 'message': 'success', 'result': serializer.data})











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
