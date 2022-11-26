# Generated by Django 3.1.13 on 2022-11-24 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_merge_20221007_0033'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='name',
            new_name='contact',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
        migrations.AddField(
            model_name='user',
            name='firstname',
            field=models.CharField(default='', max_length=120),
        ),
        migrations.AddField(
            model_name='user',
            name='is_customer',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='lastname',
            field=models.CharField(default='', max_length=120),
        ),
    ]