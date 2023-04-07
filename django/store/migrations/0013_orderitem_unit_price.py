# Generated by Django 4.1.7 on 2023-03-06 09:52

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_order_payment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='unit_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6, validators=[django.core.validators.MinValueValidator(1)]),
            preserve_default=False,
        ),
    ]