from django.contrib import admin
from .models import *


# Models for Admin
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'user_types')
    search_fields = ('first_name', 'last_name', 'user_types')

class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ('patient', 'birth_date', 'gender', 'blood_type', 'about_me')
    search_fields = ('patient', 'blood_type')

class PatientAdmin(admin.ModelAdmin):
    list_display = ('user', 'financer', 'affiliate_code', 'plan')
    search_fields = ('user', 'financer')

class MedicalStaffAdmin(admin.ModelAdmin):
    list_display = ('user', 'specialty', 'medical_license')
    search_fields = ('user', 'specialty')

class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('appointment_date', 'appointment_time', 'user', 'doctor', 'entity', 'status')
    search_fields = ('appointment_date', 'doctor', 'status')

class TreatmentAdmin(admin.ModelAdmin):
    list_display = ('treat_name', 'pathology', 'treat_type', 'treat_medication', 'create_by')
    search_fields = ('treat_name', 'treat_type', 'create_by')

class TreatAdherenceAdmin(admin.ModelAdmin):
    list_display = ('patient', 'treatment', 'start_datetime', 'treat_duration', 'treat_frecuency', 'treat_adherence')
    search_fields = ('patient', 'treatment')

class ClinicalHistoryAdmin(admin.ModelAdmin):
    list_display = ('patient', 'entity', 'doctor', 'date_of_attention', 'pathology', 'medical_studies', 'attention_observations', 'treatment')
    search_fields = ('patient','doctor', 'date_of_attention', 'pathology')

class MedicalHistoryAdmin(admin.ModelAdmin):
    list_display = ('patient', 'conditions', 'interventions', 'family_conditions', 'allergies', 'active_medication')
    search_fields = ('patient', 'family_conditions')

class CrossTrasplantAdmin(admin.ModelAdmin):
    list_display = ('cross_patient', 'HLA_patient', 'cross_donor', 'HLA_donor', 'description')
    search_fields = ('cross_patient', 'HLA_patient', 'HLA_donor')

# Register your models here.
admin.site.site_header = 'Administración'
admin.site.site_header = 'Administración de la base de datos de Justina.io'
admin.site.register(UserType)
admin.site.register(Address)
admin.site.register(DocumentType)
admin.site.register(User, UserAdmin)
admin.site.register(Financer)
admin.site.register(Entity)
admin.site.register(PersonalInfo, PersonalInfoAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(MedicalStaff, MedicalStaffAdmin)
admin.site.register(Specialty)
admin.site.register(Availability)
admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(Pathology)
admin.site.register(Treatment, TreatmentAdmin)
admin.site.register(TreatAdherence, TreatAdherenceAdmin)
admin.site.register(Pharmacy)
admin.site.register(Medication)
admin.site.register(ClinicalHistory, ClinicalHistoryAdmin)
admin.site.register(MedicalHistory, MedicalHistoryAdmin)
admin.site.register(CrossTransplant, CrossTrasplantAdmin)