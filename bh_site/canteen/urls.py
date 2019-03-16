from django.urls import path
from .views import test_view, index_view

urlpatterns = [
    path('test/', test_view),
    path('index/', index_view),
    path('', index_view),
]