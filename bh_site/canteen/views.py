from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from django.contrib.auth.models import User


# Create your views here.


def test_view(request):
    if request.user.is_authenticated:
        username = request.user

        user = User.objects.get(username=username)
        canteens = CanteenModel.objects.all()

        manage_canteens = []
        for canteen in canteens:
            if user.has_perm("manage_canteen", canteen):
                manage_canteens.append(canteen.pk)

        response = {
            "canteens_manage_id": manage_canteens,
        }

        return JsonResponse(response)
    else:
        return HttpResponse("Not authenticated")


def GET_Canteens_View(request):
    #time =

    canteens = CanteenModel.objects.all()
    #response{"canteens":[{}]}
    canteen_info = []
    for canteen in canteens:
        canteen_info.append({"id":canteen.pk,
                            "name":canteen.name,
                             "description":canteen.description})
    response={"canteens":canteen_info}
    return JsonResponse(response)

def GET_Categories_View(request):
    canteen_id=1
    #canteen_id = request.category_id
    categories = CategoryModel.objects.filter(canteen=canteen_id)
    category_info = []
    for category in categories:
        dishes = DishModel.objects.filter(category=category.pk)
        category_info.append({"id":category.id,
                            "name":category.name,
                            "image":str(category.image),
                            "num_dishes":len(dishes)})

    response = {"categories":category_info}
    return JsonResponse(response)

def GET_Dishes_View(request):
    category_id=5
    #category_id = request.category_id
    dishes = DishModel.objects.filter(category=category_id)
    dishes_info = []
    print(dishes)
    for dish in dishes:
        dishes_info.append({"id": dish.id,
                            "name": dish.name,
                            "calories": dish.calories,
                            "proteins": dish.proteins,
                            "fats": dish.fats,
                            "carbohydrates": dish.carbohydrates,
                            "price": dish.price,
                            "mass": dish.mass,
                            "description": dish.description,
                            "image": str(dish.image)
                            })
    response = {"dishes":dishes_info}
    return JsonResponse(response)





def index_view(request):
    html = render(request, "canteen/index.html", {})
    return HttpResponse(html)
