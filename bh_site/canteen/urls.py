from django.urls import path
from .views import GET_Manage_Canteens_Id_View, index_view, GET_Canteens_View, GET_Categories_View, GET_Dishes_View, POST_Category_View,PATCH_Category_View,DELETE_Category_View, POST_Dish_View,PATCH_Dish_View, DELETE_Dish_View, test_template

urlpatterns = [
    path('index/', index_view),
    path('test1/', GET_Manage_Canteens_Id_View),
    path('test2/', GET_Canteens_View),
    path('test3/', GET_Categories_View),
    path('test4/', GET_Dishes_View),
    path('test5/', POST_Category_View),
    path('test6/', PATCH_Category_View),
    path('test7/', DELETE_Category_View),
    path('test8/', POST_Dish_View),
    path('test9/', PATCH_Dish_View),
    path('test10/', DELETE_Dish_View),
    path('test11/', test_template),
    path('', index_view),
]