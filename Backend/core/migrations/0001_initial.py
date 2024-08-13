# Generated by Django 5.0.7 on 2024-08-12 16:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='uploads/')),
                ('uploaded_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Financer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Nomenclature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codes', models.CharField(blank=True, max_length=100, null=True)),
                ('description', models.CharField(max_length=100)),
                ('fee', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pharmacy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lab_name', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Specialty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(default='Default Description', max_length=255)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('first_login', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('url_photo', models.FilePathField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(blank=True, max_length=255, null=True)),
                ('number', models.CharField(blank=True, max_length=10, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('province', models.CharField(blank=True, max_length=255, null=True)),
                ('country', models.CharField(blank=True, max_length=255, null=True)),
                ('observations', models.TextField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['city'],
                'unique_together': {('street', 'number', 'city')},
            },
        ),
        migrations.CreateModel(
            name='Entity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(default='Medical Institution', max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.address')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalStaff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medical_license', models.CharField(max_length=255)),
                ('consultation_phone', models.CharField(max_length=20)),
                ('documents', models.FileField(blank=True, null=True, upload_to='uploads/')),
                ('is_active', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medical_staff', to=settings.AUTH_USER_MODEL)),
                ('specialty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.specialty')),
            ],
        ),
        migrations.CreateModel(
            name='Availability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.CharField(choices=[('lunes', 'Lunes'), ('martes', 'Martes'), ('miercoles', 'Miercoles'), ('jueves', 'Jueves'), ('viernes', 'Viernes'), ('sabado', 'Sabado'), ('domingo', 'Domingo')], max_length=10)),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.entity')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.medicalstaff')),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appointment_date', models.CharField(default='01-01-2024', max_length=10)),
                ('appointment_time', models.CharField(default='00:00', max_length=10)),
                ('status', models.CharField(choices=[('available', 'Available'), ('reserved', 'Reserved'), ('canceled', 'Canceled')], default='available', max_length=20)),
                ('is_active', models.BooleanField(default=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.entity')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.medicalstaff')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalStaffReviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('medical_staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='core.medicalstaff')),
            ],
        ),
        migrations.CreateModel(
            name='Pathology',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('nomenclature', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.nomenclature')),
                ('specialty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.specialty')),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('affiliate_code', models.CharField(blank=True, max_length=100, null=True)),
                ('plan', models.CharField(blank=True, max_length=20, null=True)),
                ('financer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.financer')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MedicalHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('conditions', models.TextField()),
                ('interventions', models.TextField()),
                ('family_conditions', models.TextField()),
                ('allergies', models.TextField()),
                ('active_medication', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medical_histories', to='core.patient')),
            ],
        ),
        migrations.CreateModel(
            name='CrossTransplant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('HLA_patient', models.CharField(blank=True, max_length=255, null=True)),
                ('HLA_donor', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(max_length=500)),
                ('is_active', models.BooleanField(default=True)),
                ('cross_donor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='CrossDonor', to='core.patient')),
                ('cross_patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.patient')),
            ],
        ),
        migrations.CreateModel(
            name='PersonalInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_number', models.CharField(max_length=20)),
                ('birth_date', models.DateTimeField()),
                ('gender', models.CharField(max_length=10)),
                ('address', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=20)),
                ('phone_number_2', models.CharField(blank=True, max_length=20, null=True)),
                ('emergency_contact', models.CharField(max_length=100)),
                ('blood_type', models.CharField(max_length=3)),
                ('about_me', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
                ('document_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.documenttype')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='personal_info', to='core.patient')),
            ],
        ),
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medication_name', models.CharField(max_length=100)),
                ('treatment', models.TextField(blank=True, null=True)),
                ('description', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('dosage', models.CharField(max_length=100)),
                ('pathology', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.pathology')),
                ('pharmacy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.pharmacy')),
            ],
        ),
        migrations.CreateModel(
            name='Treatment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('treat_name', models.CharField(max_length=100, unique=True)),
                ('treat_type', models.CharField(max_length=100)),
                ('treat_indications', models.TextField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('create_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.medicalstaff')),
                ('pathology', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.pathology')),
                ('treat_medication', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='treat_medication', to='core.medication')),
            ],
        ),
        migrations.CreateModel(
            name='TreatAdherence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_datetime', models.CharField(max_length=10)),
                ('treat_duration', models.CharField(max_length=5)),
                ('treat_frecuency', models.CharField(max_length=5)),
                ('treat_adherence', models.TextField()),
                ('is_active', models.BooleanField(default=True)),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.patient')),
                ('treatment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.treatment')),
            ],
        ),
        migrations.CreateModel(
            name='ClinicalHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_attention', models.DateField()),
                ('medical_studies', models.TextField(blank=True, null=True)),
                ('attention_observations', models.TextField(blank=True, null=True)),
                ('entity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clinical_histories', to='core.entity')),
                ('doctor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medical_staff', to='core.medicalstaff')),
                ('pathology', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pathology', to='core.pathology')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clinical_histories', to='core.patient')),
                ('treatment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='treatment', to='core.treatment')),
            ],
        ),
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_user', models.CharField(max_length=20)),
                ('id_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='groups', to='auth.group')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='user_types',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='core.usertype'),
        ),
    ]
