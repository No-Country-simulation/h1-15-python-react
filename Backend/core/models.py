from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group


User = get_user_model()


# TipoUsuario model
class TipoUsuario(models.Model):
    tipo = models.IntegerField()
    id_usuario = models.ForeignKey(
        User, related_name='user', on_delete=models.CASCADE)
    id_group = models.ForeignKey(
        Group, related_name='group', on_delete=models.CASCADE)

# Paciente model


class Paciente(models.Model):
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    id_entidad = models.ForeignKey('Entidad', on_delete=models.CASCADE)
    id_financiador = models.ForeignKey('Financiador', on_delete=models.CASCADE)
    id_tratamiento = models.ForeignKey('Tratamiento', on_delete=models.CASCADE)
    id_personal_medico = models.ForeignKey(
        'PersonalMedico', on_delete=models.CASCADE)
    id_patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    id_tipo_documento = models.ForeignKey(
        'TipoDocumento', on_delete=models.CASCADE)
    id_historia_clinica = models.ForeignKey(
        'HistoriaClinica', on_delete=models.CASCADE)

# HistoriaClinica model


class HistoriaClinica(models.Model):
    id_antecedente_medico = models.ForeignKey(
        'AntecedenteMedico', on_delete=models.CASCADE)

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
    direccion = models.ForeignKey(
        'Direccion', related_name='direcciones', on_delete=models.CASCADE)
    numero_telefono = models.CharField(max_length=20)
    numero_telefono_2 = models.CharField(max_length=20, null=True, blank=True)
    correo_contacto = models.EmailField()
    factor_sanguineo = models.CharField(max_length=3)
    id_informacion_personal = models.ForeignKey(
        User, related_name='usuario', on_delete=models.CASCADE, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return '%s, %s, %s' % (self.nombres, self.apellidos, self.nro_documento)

    class Meta:
        unique_together = ('nombres', 'apellidos', 'nro_documento')
        ordering = ['apellidos', 'nombres']

# Direccion model


class Direccion(models.Model):
    ciudad = models.CharField(max_length=255, null=True, blank=True)
    calle = models.CharField(max_length=255, null=True, blank=True)
    numero = models.CharField(max_length=10, null=True, blank=True)
    observaciones = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.calle}, {self.numero}, {self.ciudad}'

    class Meta:
        unique_together = ('calle', 'numero', 'ciudad')
        ordering = ['ciudad']


# PersonalMedico model


class PersonalMedico(models.Model):
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_especialidad = models.ForeignKey(
        'Especialidad', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

# Especialidad model


class Especialidad(models.Model):
    tipo = models.IntegerField()
    is_active = models.BooleanField(default=True)

# TipoDocumento model


class TipoDocumento(models.Model):
    id_personal_medico = models.ForeignKey(
        'PersonalMedico', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

# Financiador model


class Financiador(models.Model):
    id_personal_medico = models.ForeignKey(
        'PersonalMedico', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

class Nomenclador(models.Model):
    codigos = models.CharField(max_length=100, null=True, blank=True)
    descripcion = models.CharField(max_length=100)
    arancel = models.IntegerField(null=True, blank=True)

############-ESTO ES UNA PRUEBA PARA SUBIR NOMENCLADORES-############################

class FileUpload(models.Model):
    file= models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now=True)

############FIN DE LA PRUEBA############################

# Patologia model


class Patologia(models.Model):
    id_especialidad = models.ForeignKey(
        'Especialidad', on_delete=models.CASCADE)
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
    dia_turno = models.DateField()
    inicio_turno = models.TimeField()
    fin_turno = models.TimeField()
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, blank=True, null=True)
    medico = models.ForeignKey(PersonalMedico, on_delete=models.CASCADE)
    entidad = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    status = models.CharField(default="Disponible")
    is_active = models.BooleanField(default=True)

# Disponibilidad model
class Disponibilidad(models.Model):
    medico = models.ForeignKey(PersonalMedico, on_delete=models.CASCADE)
    institucion = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    dia = models.IntegerField(max_length=1)
    hora_inicio_turnos = models.TimeField()
    hora_fin_turnos = models.TimeField()
    is_active = models.BooleanField(default=True)

# TrasplanteCruzado model
class TrasplanteCruzado(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    donante_cruzado = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=500)
    is_active = models.BooleanField(default=True)