# Generated by Django 2.0 on 2019-03-16 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('canteen', '0004_auto_20190316_2034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dishmodel',
            name='image',
            field=models.ImageField(null=True, upload_to='media/', verbose_name='картинка'),
        ),
    ]
