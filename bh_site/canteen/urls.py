from django.urls import path
from .views import GET_Manage_Canteens_Id_View, index_view, GET_Canteens_View, GET_Categories_View, GET_Dishes_View, POST_Category_View,PATCH_Category_View,DELETE_Category_View, POST_Dish_View,PATCH_Dish_View, DELETE_Dish_View

urlpatterns = [
    path('test1/', GET_Manage_Canteens_Id_View),
    path('index/', index_view),
    path('test2/', GET_Canteens_View),
    path('get_categories/', GET_Categories_View),
    path('test4/', GET_Dishes_View),
    path('post_categories/', POST_Category_View),
    path('patch_categories/', PATCH_Category_View),
    path('test7/', DELETE_Category_View),
    path('test8/', POST_Dish_View),
    path('test9/', PATCH_Dish_View),
    path('test10/', DELETE_Dish_View),


    path('', index_view),
]