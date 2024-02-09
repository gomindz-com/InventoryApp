from django.urls import path
from .views import ( 
     MobileProductListCreateView, ProductRetreiveUpdateDeleteView,
     DamagesListCreateView,TransactionListCreateAPIView,StoreStatisticsView,
     lowstockproduct,
)

urlpatterns = [
     path('mobileProducts', MobileProductListCreateView.as_view(), name='listcreatemobileproducts'),
     path('mobileProducts/<int:pk>', ProductRetreiveUpdateDeleteView.as_view(), name='detailupdatedeletemobileproducts'),
     path('damaged', DamagesListCreateView.as_view(), name='listcreatemobiledamages'),
     path('transactions', TransactionListCreateAPIView.as_view(), name='listcreatetransaction'),
     path('stats', StoreStatisticsView.as_view(), name='statsView'),
     path('lowstockproduct/', lowstockproduct)
]
