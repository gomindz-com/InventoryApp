from django.urls import path
from .views import ( 
     twilio, 
     MobileProductListCreateView, ProductRetreiveUpdateDeleteView,
     DamagesListCreateView,

     # StoreStatisticsView,
     # OrderListCreateView, OrderRetreiveUpdateDeleteView,

     # productCounts, orderCounts,
     # total_stock, total_price,
     # lowstockproduct,
     # cash_invoice,

)


# app_name = 'store_api'

urlpatterns = [
     path('twilio', twilio),
     path('mobileProducts', MobileProductListCreateView.as_view(), name='listcreatemobileproducts'),
     path('mobileProducts/<int:pk>', ProductRetreiveUpdateDeleteView.as_view(), name='detailupdatedeletemobileproducts'),
     path('damaged', DamagesListCreateView.as_view(), name='listcreatemobiledamages'),



     # path('orders', OrderListCreateView.as_view(), name='listcreateorders'),
     # path('orders/<int:pk>', OrderRetreiveUpdateDeleteView.as_view(), name='detaildeleteorders'),
     # path('storestatistics', StoreStatisticsView.as_view(), name='liststorestatistics'),
     



    
    
#     path('ordercount/', orderCounts),
#     path('productcount/', productCounts),
#     path('totalstock/', total_stock),
#     path('totalprice/', total_price),
#     path('lowstockproduct/', lowstockproduct),
#     path('cashpending/', cash_invoice),
#     path('cashpending/<int:id>', cash_invoice),

]
