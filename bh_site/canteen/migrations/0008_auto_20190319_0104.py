# Generated by Django 2.0 on 2019-03-18 22:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('canteen', '0007_auto_20190318_1526'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categorymodel',
            name='image',
            field=models.ImageField(null=True, upload_to='', verbose_name='картинка'),
        ),
        migrations.AlterField(
            model_name='dishmodel',
            name='image',
            field=models.ImageField(null=True, upload_to='', verbose_name='картинка'),
        ),
    ]
