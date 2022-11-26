# Generated by Django 4.1.1 on 2022-10-06 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0017_alter_order_status_alter_product_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('decline', 'Decline'), ('approved', 'Approved'), ('processing', 'Processing'), ('complete', 'Complete'), ('bulk', 'Bulk')], default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='product',
            name='status',
            field=models.CharField(choices=[('instock', 'instock'), ('notInstock', 'notInstock')], default='', max_length=20),
        ),
    ]