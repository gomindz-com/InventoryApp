# Generated by Django 4.1.1 on 2022-10-05 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0009_remove_supplier_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='status',
            field=models.CharField(default='', max_length=120),
        ),
    ]
