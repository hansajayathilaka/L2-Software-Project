# Generated by Django 2.2.28 on 2023-01-04 14:20

from django.db import migrations
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('iiw_book', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sessionstate',
            name='data',
            field=jsonfield.fields.JSONField(default=dict),
        ),
    ]