# Generated by Django 4.1.1 on 2022-09-23 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0013_delivery_reciept_delivery_reference_delivery_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='order',
            field=models.CharField(default='', max_length=120),
        ),
    ]
