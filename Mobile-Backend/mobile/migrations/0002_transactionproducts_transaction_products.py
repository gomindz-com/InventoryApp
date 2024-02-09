# Generated by Django 4.1.3 on 2023-05-29 17:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mobile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TransactionProducts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mobile.transaction')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mobile.product')),
            ],
        ),
        migrations.AddField(
            model_name='transaction',
            name='products',
            field=models.ManyToManyField(through='mobile.TransactionProducts', to='mobile.product'),
        ),
    ]