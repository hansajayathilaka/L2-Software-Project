# Generated by Django 2.2 on 2019-04-20 05:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('iiw_book', '0002_auto_20190419_1935'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendee',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
