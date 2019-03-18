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
        return HttpResponse("Not autenticated")





def index_view(request):
    html = render(request, "canteen/index.html", {})
    return HttpResponse(html)
