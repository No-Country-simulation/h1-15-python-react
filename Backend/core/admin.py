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

"""
admin.site.register(Paciente)
admin.site.register(AntecedenteClinico)
admin.site.register(InformacionPersonal)
admin.site.register(PersonalMedico)
admin.site.register(Especialidad)
admin.site.register(Patologia)
admin.site.register(Tratamiento)
admin.site.register(Farmacia)
admin.site.register(Medicamento)
admin.site.register(Entidad)
"""