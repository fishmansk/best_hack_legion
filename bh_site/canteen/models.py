from django.db import models

# Create your models here.

class CanteenModel(models.Model):
    name = models.CharField(max_length=30, verbose_name="Название столовой")
    description = models.TextField(max_length=100, verbose_name="описание", default="")

    def __str__(self):
        return self.name

    class Meta():
        verbose_name = "Столовая"
        verbose_name_plural = "Столовые"
        permissions = (
            ('manage_canteen', "Manage Canteen"),
        )


class CategoryModel(models.Model):
    name = models.CharField(max_length=100, verbose_name="название катогории")
    canteen = models.ForeignKey(CanteenModel, on_delete=False, verbose_name="столовая")
    image = models.ImageField(null=True,upload_to="media/", verbose_name="картинка")

    def __str__(self):
        return self.name
    class Meta():
        verbose_name = "Категория"
        verbose_name_plural = "Категории"



class DishModel(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название блюда")
    category = models.ForeignKey(CategoryModel, on_delete=False, verbose_name="категория", null=True)
    calories = models.IntegerField(verbose_name="калории")
    proteins = models.IntegerField(verbose_name="белки")
    fats = models.IntegerField(verbose_name="жиры")
    carbohydrates = models.IntegerField(verbose_name="углеводы")
    price = models.IntegerField(verbose_name="цена")
    mass = models.IntegerField(verbose_name="вес")
    description = models.TextField(max_length=100, verbose_name="описание")
    image = models.ImageField(null=True,upload_to="media/", verbose_name="картинка")


    def __str__(self):
        return self.name
    class Meta():
        verbose_name = "Блюдо"
        verbose_name_plural = "Блюда"