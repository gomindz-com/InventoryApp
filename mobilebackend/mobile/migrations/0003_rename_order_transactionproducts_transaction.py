# Generated by Django 4.1.3 on 2023-05-29 17:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mobile', '0002_transactionproducts_transaction_products'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transactionproducts',
            old_name='order',
            new_name='transaction',
        ),
    ]
