from django.db import models



class Entidad(models.Model):
    idEntidades = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

class Especialidad(models.Model):
    idEspecialidad = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

class Patologia(models.Model):
    idPatologias = models.AutoField(primary_key=True)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT)
    descripcion = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

class PersonalMedico(models.Model):
    idPersonalMedico = models.AutoField(primary_key=True)
    especialidad = models.ManyToManyField(Especialidad, through='PersonalMedicoEspecialidad')
    descripcion = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

class TipoDocumento(models.Model):
    idTipoDocumento = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)
    status = models.BooleanField(default=True)

class Financiero(models.Model):
    idPrepagas = models.IntegerField()
    personal_medico = models.ForeignKey(PersonalMedico, on_delete=models.PROTECT)
    descripcion = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

class Tratamiento(models.Model):
    idTratamiento = models.AutoField(primary_key=True)
    patologia = models.ForeignKey(Patologia, on_delete=models.PROTECT)
    status = models.BooleanField(default=True)

class FactorSanguineo(models.Model):
    idFactor = models.AutoField(primary_key=True)
    factor_sanguineo = models.CharField(max_length=3)
    status = models.BooleanField(default=True)

class Paciente(models.Model):
    idPaciente = models.AutoField(primary_key=True)
    # relaciones
    entidad = models.ForeignKey(Entidad, on_delete=models.PROTECT)
    prepaga = models.ForeignKey(Financiero, on_delete=models.PROTECT)
    tratamientos = models.ManyToManyField(Tratamiento, through='TratamientoPaciente') #muchos a muchos
    personal_medico = models.ManyToManyField(PersonalMedico, through='PersonalMedicoPaciente') #muchos a muchos
    patologias = models.ManyToManyField(Patologia, through='PacientePatologia') #muchos a muchos
    tipo_documento = models.ForeignKey(TipoDocumento, on_delete=models.PROTECT)
    factor_sanguineo = models.ForeignKey(FactorSanguineo, on_delete=models.PROTECT)
    # datos propios
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    nro_documento = models.IntegerField()
    fecha_nacimiento = models.DateField()
    sexo = models.IntegerField()
    status = models.BooleanField(default=True)

#### tODO ESTO ES UN BLOQUE QUE QUIERO REVISAR CON LOS CHICOS
class Laboratorio(models.Model):
    idLaboratorio = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

class Farmacia(models.Model):
    idFarmacia = models.AutoField(primary_key=True)
    laboratorio = models.ForeignKey(Laboratorio, on_delete=models.PROTECT) 
    medicamento = models.IntegerField()
    status = models.BooleanField(default=True)

class Medicamento(models.Model):
    idMedicamento = models.AutoField(primary_key=True)
    farmacia = models.ForeignKey(Farmacia, related_name='medicamentos', on_delete=models.PROTECT) #esto lo quiero revisar, tengo dudas
    descripcion = models.CharField(max_length=255)  # Cambiado a texto, en la documentacion es integer
    status = models.BooleanField(default=True)

# Relaciones intermedias (Many-to-Many)

class PacientePatologia(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT)
    patologia = models.ForeignKey(Patologia, on_delete=models.PROTECT)

class PersonalMedicoEspecialidad(models.Model):
    personal_medico = models.ForeignKey(PersonalMedico, on_delete=models.PROTECT)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, related_name='personal_medico_especialidad')

class PersonalMedicoPaciente(models.Model):
    personal_medico = models.ForeignKey(PersonalMedico, on_delete=models.PROTECT)
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT)

class PatologiaTratamiento(models.Model):
    patologia = models.ForeignKey(Patologia, on_delete=models.PROTECT)
    tratamiento = models.ForeignKey(Tratamiento, on_delete=models.PROTECT)

class TratamientoPaciente(models.Model):
    tratamiento = models.ForeignKey(Tratamiento, on_delete=models.PROTECT)
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT)

class PatologiaMedicamento(models.Model):
    patologia = models.ForeignKey(Patologia, on_delete=models.PROTECT)
    medicamento = models.ForeignKey(Medicamento, on_delete=models.PROTECT)