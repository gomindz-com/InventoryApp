# Generated by Django 4.1.3 on 2023-01-25 11:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_rename_productquantity_orderproducts_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='label',
            new_name='description_color',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='tags',
            new_name='label_size',
        ),
    ]
