from django.urls import path

from .views import RegisterUser, LoginUser, UserRetrieveView, UserUpdateView, UserUpdatePasswordView

urlpatterns = [
    path('login', LoginUser.as_view(), name='login_user'),
    path('register', RegisterUser.as_view(), name='register_user'),
    path('details', UserRetrieveView.as_view(), name='user_details'),
    path('update', UserUpdateView.as_view(), name='user_update'),
    path('updatePassword', UserUpdatePasswordView.as_view(), name='user_update_password'),
] 