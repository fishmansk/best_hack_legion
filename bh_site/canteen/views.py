from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from django.contrib.auth.models import User
import base64
import uuid
from django.conf import settings
import os
import json


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

def POST_Category_View(request):
    Add_Category = {
        "name":"гарнир",
        "canteen":1,
        "image":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==',
        "image_name": "keklol.png",
    }
    data = request.body.decode()
    data = json.loads(data)
    Add_Category = data

    image = Add_Category["image"].split(',')[1]
    image_64_decode = base64.b64decode(image)
    media_root = settings.MEDIA_ROOT
    filename = str(uuid.uuid4())+str("_")+ str(Add_Category["image_name"])
    path = os.path.join(media_root, filename)
    print(path)
    # image_result = open('media/category_'+str(category.)+'.png', 'wb')
    file = open(path, 'wb')
    file.write(image_64_decode)
    category = CategoryModel(name=Add_Category['name'], canteen_id=Add_Category['canteen'], image=str(filename))
    # image_result.write(image_64_decode)
    category.save()
    Add_Category['id']=category.pk
    return JsonResponse(Add_Category)

def PATCH_Category_View(request):
    Add_Category = {
        "id":"44",
        "name":"PPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
        "canteen":1,
        "image":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==',
        "image_name":"keklllke.png",
    }

    data = request.body.decode()
    data = json.loads(data)
    Add_Category = data

    image = Add_Category["image"].split(',')[1]
    image_64_decode = base64.b64decode(image)
    media_root = settings.MEDIA_ROOT
    filename = str(uuid.uuid4()) + str("_") + str(Add_Category["image_name"])
    path = os.path.join(media_root, filename)
    print(path)
    file = open(path, 'wb')
    file.write(image_64_decode)

    category = CategoryModel.objects.get(pk=Add_Category["id"])
    category.name = Add_Category["name"]
    category.canteen_id = Add_Category["canteen"]
    category.image = filename

    category.save()
    return JsonResponse(Add_Category)


def DELETE_Category_View(request):
    Delete_Category={'id': 22}
    CategoryModel.objects.filter(id=Delete_Category['id']).delete()
    return JsonResponse({"all":"right"})



def GET_Dishes_View(request):
    category_id=5
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
                            "image": str(dish.image),
                            })
    response = {"dishes":dishes_info}
    return JsonResponse(response)


def POST_Dish_View(request):
    Add_Dish = {
        "name":"dadadaddff",
        "category":20,
        "image":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==',
        "proteins":20,
        "calories":20,
        "fats":20,
        "carbohydrates":20,
        "price":20,
        "mass":20,
        "description":"dadada",
        "image_name": "ada.png"
    }



    data = request.body.decode()
    data = json.loads(data)
    Add_Dish = data

    image = Add_Dish["image"].split(',')[1]
    image_64_decode = base64.b64decode(image)
    media_root = settings.MEDIA_ROOT
    filename = str(uuid.uuid4())+str("_")+ str(Add_Dish["image_name"])
    path = os.path.join(media_root, filename)
    print(path)
    # image_result = open('media/category_'+str(category.)+'.png', 'wb')
    file = open(path, 'wb')
    file.write(image_64_decode)
    Dish = DishModel(name=Add_Dish['name'],
                     category_id=Add_Dish['category'],
                     image=str(filename),
                     proteins=Add_Dish["proteins"],
                     calories=Add_Dish['calories'],
                     fats=Add_Dish['fats'],
                     carbohydrates=Add_Dish['carbohydrates'],
                     price=Add_Dish['price'],
                     mass=Add_Dish['mass'],
                     description=Add_Dish['description'],
                     )
    # image_result.write(image_64_decode)
    Dish.save()
    Add_Dish['id']=Dish.pk
    return JsonResponse(Add_Dish)



def PATCH_Dish_View(request):
    Add_Dish = {
        "id":29,
        "name":"dishhhhhh",
        "category":20,
        "image":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==',
        "proteins":20,
        "calories":20,
        "fats":20,
        "carbohydrates":20,
        "price":20,
        "mass":20,
        "description":"dadada",
        "image_name": "ada.png"
    }

    data = request.body.decode()
    data = json.loads(data)
    Add_Dish = data

    image = Add_Dish["image"].split(',')[1]
    image_64_decode = base64.b64decode(image)
    media_root = settings.MEDIA_ROOT
    filename = str(uuid.uuid4())+str("_")+ str(Add_Dish["image_name"])
    path = os.path.join(media_root, filename)
    print(path)
    # image_result = open('media/category_'+str(category.)+'.png', 'wb')
    file = open(path, 'wb')
    file.write(image_64_decode)
    Dish = DishModel(pk=Add_Dish['id'])


    Dish.name = Add_Dish['name']
    Dish.image = str(filename)
    Dish.category_id = Add_Dish['category']
    Dish.proteins = Add_Dish["proteins"]
    Dish.calories = Add_Dish['calories']
    Dish.fats = Add_Dish['fats']
    Dish.carbohydrates = Add_Dish['carbohydrates']
    Dish.price = Add_Dish['price']
    Dish.mass = Add_Dish['mass']
    Dish.description = Add_Dish['description']


    # image_result.write(image_64_decode)
    Dish.save()
    return JsonResponse(Add_Dish)


def DELETE_Dish_View(request):
    Delete_Dish={'id': 29}
    DishModel.objects.filter(id=Delete_Dish['id']).delete()
    return JsonResponse({"all":"right"})



def index_view(request):
    html = render(request, "canteen/index.html", {})
    return HttpResponse(html)
