# Generated by Django 4.1.1 on 2022-09-22 18:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_supplier_additional_files_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='supplier',
            name='user',
        ),
    ]
