# Generated by Django 2.0 on 2019-03-18 12:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('canteen', '0006_auto_20190316_2042'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='canteenmodel',
            options={'permissions': (('manage_canteen', 'Manage Canteen'),), 'verbose_name': 'Столовая', 'verbose_name_plural': 'Столовые'},
        ),
    ]
