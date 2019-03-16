from django.db import models

# Create your models here.

class CanteenModel(models.Model):
    name = models.CharField(max_length=50)


    def __str__(self):
        return str(self.name)

    class Meta():
        verbose_name = "Столовая"
        permissions = (
            ('edit_canteen', "Edit Canteen"),
        )