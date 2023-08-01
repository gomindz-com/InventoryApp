from django.urls import path
from .views import ( 
     twilio, 
     MobileProductListCreateView, ProductRetreiveUpdateDeleteView,
     DamagesListCreateView,TransactionListCreateAPIView,StoreStatisticsView,

     lowstockproduct,
     # total_stock_in, total_stock_out, total_stock_in_hand
     # StoreStatisticsView,
     # OrderListCreateView, OrderRetreiveUpdateDeleteView,

     # productCounts, orderCounts,
     # total_stock, total_price,
     # cash_invoice,

)


# app_name = 'store_api'

urlpatterns = [
     path('twilio', twilio),
     path('mobileProducts', MobileProductListCreateView.as_view(), name='listcreatemobileproducts'),
     path('mobileProducts/<int:pk>', ProductRetreiveUpdateDeleteView.as_view(), name='detailupdatedeletemobileproducts'),
     path('damaged', DamagesListCreateView.as_view(), name='listcreatemobiledamages'),
     path('transactions', TransactionListCreateAPIView.as_view(), name='listcreatetransaction'),
     path('stats', StoreStatisticsView.as_view(), name='statsView'),


     path('lowstockproduct/', lowstockproduct)


]
