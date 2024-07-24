from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# User model
class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


# TipoUsuario model
class TipoUsuario(models.Model):
    tipo = models.IntegerField()
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_group = models.ForeignKey(Group, on_delete=models.CASCADE)

# Paciente model
class Paciente(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_entidad = models.ForeignKey('Entidad', on_delete=models.CASCADE)
    id_financiador = models.ForeignKey('Financiador', on_delete=models.CASCADE)
    id_tratamiento = models.ForeignKey('Tratamiento', on_delete=models.CASCADE)
    id_personal_medico = models.ForeignKey('PersonalMedico', on_delete=models.CASCADE)
    id_patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    id_tipo_documento = models.ForeignKey('TipoDocumento', on_delete=models.CASCADE)
    id_historia_clinica = models.ForeignKey('HistoriaClinica', on_delete=models.CASCADE)

# HistoriaClinica model
class HistoriaClinica(models.Model):
    id_antecedente_medico = models.ForeignKey('AntecedenteMedico', on_delete=models.CASCADE)

# AntecedenteMedico model
class AntecedenteMedico(models.Model):
    fecha_atencion = models.DateTimeField()
    informacion = models.TextField()
    identificador_examen = models.CharField(max_length=255)
    id_patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    class Meta:
        indexes = [
            models.Index(fields=['fecha_atencion'], name='fecha_atencion')
        ]

# InformacionPersonal model
class InformacionPersonal(models.Model):
    nombres = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    nro_documento = models.CharField(max_length=20)
    fecha_nacimiento = models.DateTimeField()
    sexo = models.CharField(max_length=10)
    direccion = models.ForeignKey('Direccion', on_delete=models.CASCADE)
    numero_telefono = models.CharField(max_length=20)
    numero_telefono_2 = models.CharField(max_length=20, null=True, blank=True)
    correo_contacto = models.EmailField()
    factor_sanguineo = models.CharField(max_length=3)
    id_informacion_personal = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

# Direccion model
class Direccion(models.Model):
    calle = models.CharField(max_length=255)
    localidad = models.IntegerField()
    provincia = models.IntegerField()
    departamento = models.IntegerField()
    municipio = models.IntegerField()
    numero = models.CharField(max_length=10)
    observaciones = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

# PersonalMedico model
class PersonalMedico(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_especialidad = models.ForeignKey('Especialidad', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

# Especialidad model
class Especialidad(models.Model):
    tipo = models.IntegerField()
    is_active = models.BooleanField(default=True)

# TipoDocumento model
class TipoDocumento(models.Model):
    id_personal_medico = models.ForeignKey('PersonalMedico', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

# Financiador model
class Financiador(models.Model):
    id_personal_medico = models.ForeignKey('PersonalMedico', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

############-ESTO ES UNA PRUEBA PARA SUBIR FINANCIADORES-############################
"""
class FileUpload(models.Model):
    file= models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now=True)
"""
############FIN DE LA PRUEBA############################

# Patologia model
class Patologia(models.Model):
    id_especialidad = models.ForeignKey('Especialidad', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

# Tratamiento model
class Tratamiento(models.Model):
    id_patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

# Farmacia model
class Farmacia(models.Model):
    id_laboratorio = models.IntegerField()
    id_medicamento = models.IntegerField()
    is_active = models.BooleanField(default=True)

# Medicamento model
class Medicamento(models.Model):
    id_patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    id_tratamiento = models.ForeignKey('Tratamiento', on_delete=models.CASCADE)
    id_farmacia = models.ForeignKey('Farmacia', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

# Entidad model
class Entidad(models.Model):
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    
# Turnos model
class Turno(models.Model):
    inicio_turno = models.DateTimeField()
    fin_turno = models.DateTimeField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, blank=True, null=True)
    medico = models.ForeignKey(PersonalMedico, on_delete=models.CASCADE)
    entidad = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)