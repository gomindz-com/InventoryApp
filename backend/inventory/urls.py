from django.contrib import admin
from django.urls import path, include, re_path

from .views import Welcome

from django.views.static import serve
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve 

urlpatterns = [
    path('go-inv-admin', admin.site.urls),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/users/', include(('users.urls', 'users'), namespace='users')),
    path('api/store/', include(('store.urls', 'store'), namespace='store')),
    path('api/mobile/', include(('mobile.urls', 'mobile'), namespace='mobile')),

    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}), 
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
    
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

 