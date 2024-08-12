# Generated by Django 5.0.7 on 2024-08-09 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availability',
            name='day',
            field=models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miercoles', 'Miercoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes'), ('sabado', 'Sabado'), ('domingo', 'Domingo')], max_length=10),
        ),
        migrations.AlterField(
            model_name='medicalstaff',
            name='documents',
            field=models.FileField(blank=True, null=True, upload_to='uploads/'),
        ),
    ]
