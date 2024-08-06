# Generated by Django 5.0.7 on 2024-08-06 02:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tipousuario',
            name='id_usuario',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_type',
        ),
        migrations.AddField(
            model_name='user',
            name='user_types',
            field=models.ManyToManyField(related_name='users', to='core.tipousuario'),
        ),
        migrations.AlterField(
            model_name='tipousuario',
            name='id_group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='auth.group'),
        ),
    ]
