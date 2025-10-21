from django.contrib import admin
from django.urls import path
from django.conf import settings

from .views import *


urlpatterns = [
    path('', dashboard, name='dashboard'),
    path('reports/', reports, name='reports'),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns + static(settings.STATIC_URL, document_root=settings.BASE_DIR / "static")
