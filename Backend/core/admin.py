from django.contrib import admin
from .models import *

# Register your models here.
admin.site.site_header = 'Administración'
admin.site.site_header = 'Administración de la base de datos de Justina.io'
admin.site.register(UserType)
admin.site.register(Address)
admin.site.register(DocumentType)
admin.site.register(User)
admin.site.register(Financer)
admin.site.register(Entity)
admin.site.register(PersonalInfo)
admin.site.register(Patient)
admin.site.register(MedicalStaff)
admin.site.register(Specialty)
admin.site.register(Availability)
admin.site.register(Appointment)
admin.site.register(Pathology)
admin.site.register(Treatment)
admin.site.register(TreatAdherence)
admin.site.register(Pharmacy)
admin.site.register(Medication)
admin.site.register(ClinicalHistory)
admin.site.register(MedicalHistory)