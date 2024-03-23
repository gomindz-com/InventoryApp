from django.urls import path

from .views import RegisterUser, LoginUser, UserRetrieveView 

urlpatterns = [
    path('login', LoginUser.as_view(), name='login_user'),
    path('register', RegisterUser.as_view(), name='register_user'),
    path('details', UserRetrieveView.as_view(), name='user_details'),

] 