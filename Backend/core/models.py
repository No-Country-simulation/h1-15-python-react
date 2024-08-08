from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group


import json

# Custom UserManager
class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, first_name, last_name, password, **extra_fields)


# User model definition to represent users
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=False)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    user_types = models.ForeignKey('UserType', on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    first_login = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    url_photo = models.FilePathField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email


# UserType model
class UserType(models.Model):
    type_user = models.CharField(max_length=20, null=False)
    id_group = models.ForeignKey(Group, related_name='groups', on_delete=models.CASCADE)

    def __str__(self):
        return self.type_user


# Patient model
class Patient(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    financer = models.ForeignKey('Financer', on_delete=models.CASCADE)
    affiliate_code = models.CharField(max_length=100, null=True, blank=True)
    plan = models.CharField(max_length=20, null=True, blank=True)


#MedicalHistory model
class MedicalHistory(models.Model):
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE, related_name='medical_histories')
    conditions = models.TextField()
    interventions = models.TextField()
    family_conditions = models.TextField()
    allergies = models.TextField()
    active_medication = models.TextField()
    is_active = models.BooleanField(default=True)


# PersonalInfo model
class PersonalInfo(models.Model):
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE, related_name='personal_info')
    document_type = models.ForeignKey('DocumentType', on_delete=models.CASCADE)
    document_number = models.CharField(max_length=20)
    birth_date = models.DateTimeField()
    gender = models.CharField(max_length=10)
    address = models.ForeignKey('Address', related_name='addresses', on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=20)
    phone_number_2 = models.CharField(max_length=20, null=True, blank=True)
    emergency_contact = models.CharField(max_length=20)
    blood_type = models.CharField(max_length=3)
    about_me = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.patient)


# DocumentType model
class DocumentType(models.Model):
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)


# Direccion model
class Address(models.Model):
    street = models.CharField(max_length=255, null=True, blank=True)
    number = models.CharField(max_length=10, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    province = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    observations = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.street}, {self.number}, {self.city}'

    class Meta:
        unique_together = ('street', 'number', 'city')
        ordering = ['city']


# MedicalStaff model
class MedicalStaff(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='medical_staff')
    specialty = models.ForeignKey('Specialty', on_delete=models.CASCADE)
    medical_license = models.CharField(max_length=255)
    consultation_phone = models.CharField(max_length=20)
    documents = models.FilePathField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return str(self.user)


# MedicalStaffReviews model
class MedicalStaffReviews(models.Model):
    medical_staff = models.ForeignKey('MedicalStaff', on_delete=models.CASCADE, related_name='reviews')
    description = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.description} - {self.rating}"


# Specialty model
class Specialty(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, default='Default Description')
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name


# Financer model
class Financer(models.Model):
    #medical_staff = models.ForeignKey(
    #    'MedicalStaff', on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.id} - {self.description}"


# Nomenclature model
class Nomenclature(models.Model):
    codes = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=100)
    fee = models.IntegerField(null=True, blank=True)


class FileUpload(models.Model):
    file= models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now=True)


# Pathology model
class Pathology(models.Model):
    specialty = models.ForeignKey('Specialty', on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.description


# Treatment model
class Treatment(models.Model):
    pathology = models.ForeignKey('Pathology', on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.description


# Pharmacy model
class Pharmacy(models.Model):
    lab_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.lab_name


# Medication model
class Medication(models.Model):
    pathology = models.ForeignKey('Pathology', on_delete=models.CASCADE)
    treatment = models.ForeignKey('Treatment', on_delete=models.CASCADE)
    pharmacy = models.ForeignKey('Pharmacy', on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    dosage_form = models.CharField(max_length=255)

    def set_dosage_form(self, lst):
        self.dosage_form = json.dumps(lst)

    def get_dosage_form(self):
        return json.loads(self.dosage_form)

    def __str__(self):
        return self.description


# Entity model
class Entity(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, default='Medical Institution')
    address = models.ForeignKey('Address', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# Appointment model
class Appointment(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("reserved", "Reserved"),
        ("canceled", "Canceled"),
    ]
    appointment_date = models.CharField(max_length=10, default='01-01-2024')
    appointment_time = models.CharField(max_length=10, default='00:00')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    doctor = models.ForeignKey(MedicalStaff, on_delete=models.CASCADE)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="available")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.entity}, {self.doctor}, {self.appointment_date}, {self.appointment_time}'


# Availability model
class Availability(models.Model):
    DAY_CHOICES = [
        ("monday", "Monday"),
        ("tuesday", "Tuesday"),
        ("wednesday", "Wednesday"),
        ("thursday", "Thursday"),
        ("friday", "Friday"),
        ("saturday", "Saturday"),
        ("sunday", "Sunday"),
    ]
    doctor = models.ForeignKey(MedicalStaff, on_delete=models.CASCADE)
    entity = models.ForeignKey(Entity, on_delete=models.CASCADE)
    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_active = models.BooleanField(default=True)


# Cross Transplant model
class CrossTransplant(models.Model):
    cross_patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    cross_donor = models.ForeignKey(Patient, related_name='CrossDonor', on_delete=models.CASCADE)
    description = models.TextField(max_length=500)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.description