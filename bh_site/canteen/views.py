from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from .models import *
from django.contrib.auth.models import User


# Create your views here.


def test_view(request):
    users = User.objects.all()
    canteens = CanteenModel.objects.all()
    for user in users:
        for canteen in canteens:
            #if user.has_perm('edit_canteen', canteen):
            print(user, canteen, user.has_perm('edit_canteen', canteen))
    categories = CategoryModel.objects.get(name="Супы")
    print("C: ", categories.image)
    print(users)
    print(canteens)
    return HttpResponseRedirect("/index")


def index_view(request):
    html = render(request, "canteen/index.html", {})
    return HttpResponse(html)
