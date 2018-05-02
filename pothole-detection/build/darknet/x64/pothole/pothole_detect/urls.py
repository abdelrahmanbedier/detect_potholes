from django.conf.urls import url,static
from . import views
from django.conf import settings
import os

urlpatterns = [
    url(r'^testapi$', views.tests.as_view()),
    url(r'^imageapi$', views.images.as_view()),
]+static.static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
