# Generated by Django 5.0.7 on 2024-08-08 03:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_remove_financer_affiliate_code_remove_financer_plan_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='availability',
            old_name='institution',
            new_name='entity',
        ),
    ]
