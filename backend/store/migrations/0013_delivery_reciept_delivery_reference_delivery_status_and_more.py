# Generated by Django 4.1.1 on 2022-09-23 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_alter_order_buyer_alter_order_drop_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='delivery',
            name='reciept',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AddField(
            model_name='delivery',
            name='reference',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AddField(
            model_name='delivery',
            name='status',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AlterField(
            model_name='delivery',
            name='courier_name',
            field=models.CharField(default='', max_length=120),
        ),
    ]