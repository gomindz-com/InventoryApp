from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from store.models import Product, Supplier, Buyer, Order
import datetime


@login_required(login_url='login')
def dashboard(request):
    total_product = Product.objects.count()
    total_supplier = Supplier.objects.count()
    total_buyer = Buyer.objects.count()
    total_oder = Order.objects.count()
    orders = Order.objects.all().order_by('-id')
    context = {
        'product': total_product,
        'supplier': total_supplier,
        'buyer': total_buyer,
        'order': total_oder,
        'orders': orders
    }
    return render(request, 'dashboard.html', context)


def Welcome(request):
    now = datetime.datetime.now() 
    msg = f'Welcome to Gomindz Inv Backend. Today is {now}'
    return HttpResponse(msg, content_type='text/plain')