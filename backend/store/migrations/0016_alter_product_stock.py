# Generated by Django 4.1.3 on 2023-06-10 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_alter_product_stock'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.PositiveSmallIntegerField(default=''),
        ),
    ]
