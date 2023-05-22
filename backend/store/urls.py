from django.urls import path
from .views import ( 
     twilio, 
     CategoryListCreateView, CategoryRetreiveUpdateDeleteView,
     ProductListCreateView, ProductRetreiveUpdateDeleteView,
     OrderListCreateView, OrderRetreiveUpdateDeleteView,
     DamagesListCreateView,
     StoreStatisticsView,


     productCounts, buyerCounts, deliveryCounts, supplierCounts, orderCounts,
     total_stock, total_price,
     lowstockproduct,
     categoryProducts,
     cash_invoice,

)


app_name = 'store_api'

urlpatterns = [
     path('twilio', twilio),
     path('categories', CategoryListCreateView.as_view(), name='listcreatecategories'),
     path('categories/<int:pk>', CategoryRetreiveUpdateDeleteView.as_view(), name='detailupdatedeletecategories'),
     path('products', ProductListCreateView.as_view(), name='listcreateproducts'),
     path('products/<int:pk>', ProductRetreiveUpdateDeleteView.as_view(), name='detailupdatedeleteproducts'),
     path('orders', OrderListCreateView.as_view(), name='listcreateorders'),
     path('orders/<int:pk>', OrderRetreiveUpdateDeleteView.as_view(), name='detaildeleteorders'),
     path('storestatistics', StoreStatisticsView.as_view(), name='liststorestatistics'),
     path('damages', DamagesListCreateView.as_view(), name='listcreatedamages'),
     



    
    
    path('ordercount/', orderCounts),
    path('buyercount/', buyerCounts),
    path('suppliercount/', supplierCounts),
    path('productcount/', productCounts),
    path('deliverycount/', deliveryCounts),
    path('totalstock/', total_stock),
    path('totalprice/', total_price),
    path('categoryproducts/<int:id>', categoryProducts),
    path('lowstockproduct/', lowstockproduct),
    path('cashpending/', cash_invoice),
    path('cashpending/<int:id>', cash_invoice),

]
