# Generated by Django 4.1.7 on 2023-04-07 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0018_alter_order_payment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment_status',
            field=models.CharField(choices=[('P', 'Pending'), ('F', 'Failed'), ('C', 'Completed')], default='P', max_length=1),
        ),
    ]