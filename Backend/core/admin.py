from django.contrib import admin
from .models import *

# Register your models here.
admin.site.site_header = 'Administración'
admin.site.site_header = 'Administración de la base de datos de Justina.io'


admin.site.register(TipoUsuario)
admin.site.register(Paciente)
admin.site.register(HistoriaClinica)
admin.site.register(AntecedenteMedico)
admin.site.register(InformacionPersonal)
admin.site.register(Direccion)
admin.site.register(PersonalMedico)
admin.site.register(Especialidad)
admin.site.register(TipoDocumento)
admin.site.register(Financiador)
admin.site.register(Patologia)
admin.site.register(Tratamiento)
admin.site.register(Farmacia)
admin.site.register(Medicamento)
admin.site.register(Entidad)
