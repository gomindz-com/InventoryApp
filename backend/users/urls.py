from django.urls import path

from .views import AdminUser, RegisterUser, LoginUser, UserRetrieveView, UserUpdateView, UserUpdatePasswordView, SubscribersListCreateView, SubscriberRetreiveUpdateDeleteView

urlpatterns = [
    path('login', LoginUser.as_view(), name='login_user'),
    path('login-admin', AdminUser.as_view(), name='login_admin'),
    path('register', RegisterUser.as_view(), name='register_user'),
    path('details', UserRetrieveView.as_view(), name='user_details'),
    path('update', UserUpdateView.as_view(), name='user_update'),
    path('update-user-password', UserUpdatePasswordView.as_view(), name='user_update_password'),
    path('subscribers', SubscribersListCreateView.as_view(), name='subscribers'),
    path('update-subscriber/<int:pk>', SubscriberRetreiveUpdateDeleteView.as_view(), name='detailupdatedeletesubscriber'),

] 