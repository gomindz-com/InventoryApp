from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/mobile/', include(('mobile.urls', 'mobile'), namespace='mobile')),
    path('api/users/', include(('users.urls', 'users'), namespace='users')),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),

]