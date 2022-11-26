# Generated by Django 4.1.1 on 2022-10-06 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [

        ('store', '0019_merge_20221006_1315'),

    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='status',
            field=models.CharField(choices=[('delivered', 'delivered'), ('pending', 'pending')], default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='product',
            name='images',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=6),
        ),
        migrations.AlterField(
            model_name='product',
            name='status',
            field=models.CharField(choices=[('In Stock', 'In Stock'), ('Out of Stock', 'Out of Stock')], default='', max_length=120),
        ),
        migrations.AlterField(
            model_name='product',
            name='stock',
            field=models.PositiveIntegerField(default='', max_length=120),
        ),

        migrations.AlterField(
            model_name='supplier',
            name='additional_files',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='additional_information',
            field=models.CharField(blank=True, default='', max_length=200),
        ),

    ]