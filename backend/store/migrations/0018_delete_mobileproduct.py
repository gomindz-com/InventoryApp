# Generated by Django 4.1.3 on 2023-10-11 17:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0017_alter_product_stock'),
    ]

    operations = [
        migrations.DeleteModel(
            name='mobileProduct',
        ),
    ]