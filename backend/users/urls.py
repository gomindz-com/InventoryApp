from django.urls import path

from .views import login_page, logout_page, Register, Login, AuthenticateUser, Logout

urlpatterns = [
    path('register/', Register.as_view()),
    path('login/', Login.as_view()),
    #path('logout/', logout_page, name='logout'),
    path('logout/', Logout.as_view()),
    path('authenticate/', AuthenticateUser.as_view()),

]
