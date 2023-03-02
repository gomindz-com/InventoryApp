from django.contrib import admin
from django.urls import path, include

from .views import Welcome

from django.views.static import serve
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Welcome, name='welcome'),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/user/', include(('users.urls', 'users'), namespace='users')),
    path('api/store/', include(('store.urls', 'store'), namespace='store')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

 