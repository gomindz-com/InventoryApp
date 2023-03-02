from django.urls import path
from .views import (
    twilio,
    ProductListCreateView,
    ProductRetreiveUpdateDeleteView,
    CategoryListCreateView,
    CategoryRetreiveUpdateDeleteView,
    order_list,
    order_details,
    receipt_list,
    receipt_details,
    invoice_list,
    invoice_details,

    productCounts,
    buyerCounts,
    deliveryCounts,
    supplierCounts,
    orderCounts,
    total_orders,
    total_stock,
    total_price,

    categoryProducts,
)


app_name = 'store_api'

urlpatterns = [
    path('twilio/', twilio),
    path('products/', ProductListCreateView.as_view(), name='listcreateproducts'),
    path('products/<int:pk>/', ProductRetreiveUpdateDeleteView.as_view(),
         name='detailupdatedeleteproducts'),
    path('categories/', CategoryListCreateView.as_view(),
         name='listcreatecategories'),
    path('categories/<int:pk>/', CategoryRetreiveUpdateDeleteView.as_view(),
         name='detailupdatedeletecategories'),
    path('orders/', order_list),
    path('orders/<int:id>', order_details),

    path('invoices/', invoice_list),
    path('invoices/<int:id>', invoice_details),

    path('receipts/', receipt_list),
    path('receipts/<int:id>', receipt_details),

    path('ordercount/', orderCounts),
    path('buyercount/', buyerCounts),
    path('suppliercount/', supplierCounts),
    path('productcount/', productCounts),
    path('deliverycount/', deliveryCounts),

    path('totalstock/', total_stock),
    path('totalprice/', total_price),

    path('categoryproducts/<int:id>', categoryProducts),

]
