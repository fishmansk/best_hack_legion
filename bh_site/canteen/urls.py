from django.urls import path
from .views import test_view, index_view, GET_Canteens_View, GET_Categories_View, GET_Dishes_View

urlpatterns = [
    path('test/', test_view),
    path('index/', index_view),
    path('test2/', GET_Canteens_View),
    path('test3/', GET_Categories_View),
    path('test4/', GET_Dishes_View),
    path('', index_view),
]