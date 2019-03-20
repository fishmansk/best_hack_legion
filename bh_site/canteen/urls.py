from django.urls import path
from .views import GET_Manage_Canteens_Id_View, index_view, GET_Canteens_View, GET_Categories_View, GET_Dishes_View, POST_Category_View,PATCH_Category_View,DELETE_Category_View, POST_Dish_View,PATCH_Dish_View, DELETE_Dish_View, test_template

urlpatterns = [
    path('index/', index_view),
    path('GET/manage_canteens/', GET_Manage_Canteens_Id_View),
    path('GET/canteens/', GET_Canteens_View),
    path('GET/categories/', GET_Categories_View),
    path('GET/dishes/', GET_Dishes_View),
    path('POST/dishes/', POST_Category_View),
    path('PATCH/category/', PATCH_Category_View),
    path('DELETE/category/', DELETE_Category_View),
    path('POST/dish/', POST_Dish_View),
    path('PATCH/dish/', PATCH_Dish_View),
    path('DELETE/dish/', DELETE_Dish_View),
    path('test11/', test_template),
    path('', index_view),
]