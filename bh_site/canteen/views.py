from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from django.contrib.auth.models import User
import base64
import uuid
from django.conf import settings
import os
import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def GET_Manage_Canteens_Id_View(request):
    '''
    Получение списка столовых, доступных для редактирования
    :param request:
    :return:{
                "canteens_manage_id": [1],
            }
    '''
    if request.user.is_authenticated:

        username = request.user#получение идентификатора пользователя

        user = User.objects.get(username=username)#получение информации о пользователе из базы данных
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

@csrf_exempt
def GET_Canteens_View(request):
    '''
    Получение списка всех столовых
    :param request:
    :return: {"canteens":[
                        {"id":1,
                        "name":"Столовая 1"
                        "description":"часы работы: 9.00 - 18.00"
                        },
                        {"id":2,
                        "name":"Столовая 2"
                        "description":"часы работы: 10.00 - 16.00"
                        },
                        {"id":3,
                        "name":"Столовая 3"
                        "description":"часы работы: 10.00 - 18.00"
                        }
                        ]
            }
    '''
    canteens = CanteenModel.objects.all()
    canteen_info = []
    for canteen in canteens:
        canteen_info.append({"id":canteen.pk,
                            "name":canteen.name,
                             "description":canteen.description})
    response={"canteens":canteen_info}
    return JsonResponse(response)


@csrf_exempt
def GET_Categories_View(request):
    '''
    Получение списка категорий для столовой с первичным ключом "id"
    :param request:
    {
        "canteen_id":2
    }
    :return:
    {
    "categories": [
        {
            "id": 11,
            "name": "Первые блюда",
            "image": "1_5sXeEEP.jpg",
            "num_dishes": 2
        },
        {
            "id": 12,
            "name": "Вторые блюда",
            "image": "2_OwtXqg5.jpg",
            "num_dishes": 2
        },
        {
            "id": 13,
            "name": "Напитки",
            "image": "напики.jpg",
            "num_dishes": 2
        },
        {
            "id": 14,
            "name": "Пирожные",
            "image": "пироженые.jpg",
            "num_dishes": 2
        }
    ]
    }
    '''

    data = request.body.decode()
    data = json.loads(data)
    canteen_id = data["canteen_id"]
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
    # print()
    return JsonResponse(response)

@csrf_exempt
def POST_Category_View(request):
    '''
    Добавление категории
    :param request:
     {
        "name":"гарнир",
        "canteen":1,
        "image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==",
        "image_name":"гарнир.png"
    }

    :return:
    {
        "name": "гарнир",
        "canteen": 1,
        "image": "18f21f37-6589-414e-8aef-6294a71a02a7_гарнир.png",
        "image_name": "гарнир.png",
        "id": 49
    }
    '''

    data = request.body.decode()
    data = json.loads(data)
    Add_Category = data
    # print(data)
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
    Add_Category['image']=str(category.image)
    return JsonResponse(Add_Category)


@csrf_exempt
def PATCH_Category_View(request):
    '''
    Редактирование категории с первичным ключом "id"
    :param request:
     {
        "id":"49"
        "name":"Гарнир",
        "canteen":1,
        "image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==",
        "image_name":"гарнир.png"
    }
    :return:
   {
        "id": "49",
        "name": "Гарнир",
        "canteen": 1,
        "image": "1474b146-decf-4511-bd20-d682315bcc2c_гарнир.png",
        "image_name": "гарнир.png"
    }
    '''

    data = request.body.decode()
    data = json.loads(data)
    Add_Category = data
    print(data)
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

    Add_Category['image']=str(category.image)
    return JsonResponse(Add_Category)

@csrf_exempt
def DELETE_Category_View(request):


    '''
    Удаление категории с первичным ключом "id"
    :param request:
    {
        "id":49
    }
    :return:
    {
        "all":"right"
    }
    '''
    data = request.body.decode()
    data = json.loads(data)
    Delete_Category = data
    #Delete_Category={'id': 22}
    CategoryModel.objects.filter(id=Delete_Category['id']).delete()
    return JsonResponse({"all":"right"})


@csrf_exempt
def GET_Dishes_View(request):
    '''
    Получение информации о блюдах в категории "category_id"
    :param request:
    {
        "category_id":14
    }
    :return:
    {
    "dishes": [
        {
            "id": 18,
            "name": "Корзиночка с маком",
            "calories": 90,
            "proteins": 30,
            "fats": 20,
            "carbohydrates": 50,
            "price": 40,
            "mass": 100,
            "description": "Самая вкусная корзиночка с маком.",
            "image": "корзиночка_с_маком.jpg"
        },
        {
            "id": 19,
            "name": "Бисквитное пироженое",
            "calories": 150,
            "proteins": 20,
            "fats": 20,
            "carbohydrates": 60,
            "price": 40,
            "mass": 100,
            "description": "Самое вкусное бисквитное пирожное в этой столовой",
            "image": "бисквитное_пирожное.jpg"
        }
    ]
}
    '''
    data = request.body.decode()
    data = json.loads(data)
    category_id = data["category_id"]
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

@csrf_exempt
def POST_Dish_View(request):



    '''
    Добавление блюда
    :param request:
    {
            "name": "пюре",
            "calories": 150,
            "category":48,
            "proteins": 35,
            "fats": 35,
            "carbohydrates": 30,
            "price": 30,
            "mass": 200,
            "description": "добавление блюда пюре",
            "image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==",
            "image_name":"пюре.png"
    }
    :return:
    {
            "name": "пюре",
            "category": 48,
            "calories": 150,
            "proteins": 35,
            "fats": 35,
            "carbohydrates": 30,
            "price": 30,
            "mass": 200,
            "description": "добавление блюда пюре",
            "image": "db90662e-564d-47db-833a-d033f90464e8_пюре.png",
            "image_name": "пюре.png",
            "id": 33
    }
    '''


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
    Add_Dish['image']=str(Dish.image)
    return JsonResponse(Add_Dish)


@csrf_exempt
def PATCH_Dish_View(request):

    '''
    Редактирование блюда с превичным ключом "id"
    :param request:
    {
            "id":33,
            "name": "Пюре",
            "calories": 150,
            "category":48,
            "proteins": 35,
            "fats": 35,
            "carbohydrates": 30,
            "price": 30,
            "mass": 200,
            "description": "добавление блюда пюре",
            "image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAYAAAD+Bd/7AAAABHNCSVQICAgIfAhkiAAAADZJREFUCJlj/P///38GPICFgYGBgZGREavk////IQpgRvhCGVvUEYYy4TMeYQWMh8GAWYHHnQAAhA802d3H5gAAAABJRU5ErkJggg==",
            "image_name":"пюре.png"     
        }
    :return:
    {
            "id": 33,
            "name": "Пюре",
            "category": 48,
            "calories": 150,
            "proteins": 35,
            "fats": 35,
            "carbohydrates": 30,
            "price": 30,
            "mass": 200,
            "description": "добавление блюда пюре",
            "image": "db90662e-564d-47db-833a-d033f90464e8_пюре.png",
            "image_name": "пюре.png"
    }
    '''

    data = request.body.decode()
    data = json.loads(data)
    Add_Dish = data

    image = Add_Dish["image"].split(',')[1]
    image_64_decode = base64.b64decode(image)
    media_root = settings.MEDIA_ROOT
    filename = str(uuid.uuid4())+str("_")+ str(Add_Dish["image_name"])
    path = os.path.join(media_root, filename)
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


    Dish.save()
    Add_Dish['image']=str(Dish.image)
    return JsonResponse(Add_Dish)

@csrf_exempt
def DELETE_Dish_View(request):


    '''
    Удаление блюда с первичным ключом "id"
    :param request:
    {
        "id":33
    }
    :return:
    {
    "all": "right"
    }
    '''

    data = request.body.decode()
    data = json.loads(data)
    Delete_Dish = data
    DishModel.objects.filter(id=Delete_Dish['id']).delete()
    return JsonResponse({"all":"right"})



def index_view(request):
    html = render(request, "canteen/index.html", {})
    print(html.content)
    return HttpResponse(html)

def test_template(request):
    html = render(request, "canteen/product.html", {})
    return HttpResponse(html)