from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group


import json

# Custom UserManager
class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, first_name, last_name, password, **extra_fields)
    
# Definición del modelo User para representar los usuarios
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, null=False)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    user_types = models.ForeignKey('TipoUsuario', on_delete=models.CASCADE, related_name='users', null=True, blank=True)
    first_login = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

# TipoUsuario model
class TipoUsuario(models.Model):
    tipo = models.CharField(max_length=20, null=False)

    id_group = models.ForeignKey(
        Group, related_name='groups', on_delete=models.CASCADE)

    def __str__(self):
        return self.tipo

# Paciente model
class Paciente(models.Model):
    id_usuario = models.ForeignKey('User', on_delete=models.CASCADE)
    id_financiador = models.ForeignKey('Financiador', on_delete=models.CASCADE)


class AntecedenteClinico(models.Model):
    paciente = models.ForeignKey('Paciente', on_delete=models.CASCADE, related_name='antecedentes_medicos')
    afecciones = models.TextField()
    intervenciones = models.TextField()
    afecciones_familiares = models.TextField()
    alergias = models.TextField()
    medicacion_activa = models.TextField()
    is_active = models.BooleanField(default=True)

# InformacionPersonal model
class InformacionPersonal(models.Model):
    paciente = models.ForeignKey('Paciente', on_delete=models.CASCADE, related_name='informacion_personal')
    tipo_documento = models.ForeignKey('TipoDocumento', on_delete=models.CASCADE)
    nro_documento = models.CharField(max_length=20)
    fecha_nacimiento = models.DateTimeField()
    sexo = models.CharField(max_length=10)
    direccion = models.ForeignKey('Direccion', related_name='direcciones', on_delete=models.CASCADE)
    numero_telefono = models.CharField(max_length=20)
    numero_telefono_2 = models.CharField(max_length=20, null=True, blank=True)
    telefono_contacto = models.CharField(max_length=20)
    factor_sanguineo = models.CharField(max_length=3)
    sobre_mi = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.paciente

# TipoDocumento model
class TipoDocumento(models.Model):
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    
# Direccion model
class Direccion(models.Model):
    calle = models.CharField(max_length=255, null=True, blank=True)
    numero = models.CharField(max_length=10, null=True, blank=True)
    ciudad = models.CharField(max_length=255, null=True, blank=True)
    provincia = models.CharField(max_length=255, null=True, blank=True)
    pais = models.CharField(max_length=255, null=True, blank=True)
    observaciones = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.calle}, {self.numero}, {self.ciudad}'

    class Meta:
        unique_together = ('calle', 'numero', 'ciudad')
        ordering = ['ciudad']


# PersonalMedico model
class PersonalMedico(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='medico')
    id_especialidad = models.ForeignKey('Especialidad', on_delete=models.CASCADE)
    matricula_medica = models.CharField(max_length=255)
    telefono_consulta = models.CharField(max_length=20)
    documentos = models.FilePathField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.user

# Calificaicones Medicas
class PersonalMedicoReviews(models.Model):
    personal_medico = models.ForeignKey('PersonalMedico', on_delete=models.CASCADE, related_name='reviews')
    descripcion = models.CharField(max_length=255)
    calificacion = models.DecimalField(max_digits=3, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.descripcion} - {self.calificacion}"

# Especialidad model

class Especialidad(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, default='Descripcion Preterminada')
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre


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
    
    def __str__(self):
        return self.descripcion

# Tratamiento model


class Tratamiento(models.Model):
    id_patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.descripcion

# Farmacia model


class Farmacia(models.Model):
    nombre_laboratorio = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre_laboratorio

# Medicamento model


class Medicamento(models.Model):
    patologia = models.ForeignKey('Patologia', on_delete=models.CASCADE)
    tratamiento = models.ForeignKey('Tratamiento', on_delete=models.CASCADE)
    farmacia = models.ForeignKey('Farmacia', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    dosis_presentacion = models.CharField(max_length=255)
    
    def set_dosis_presentacion(self, lst):
        self.dosis_presentacion = json.dumps(lst)
    
    def get_dosis_presentacion(self):
        return json.loads(self.dosis_presentacion)
    
    def __str__(self):
        return self.descripcion
    

# Entidad model
class Entidad(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, default='Institución médica')
    direccion = models.ForeignKey('Direccion', on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.nombre

# Turnos model
class Turno(models.Model):
    STATUS_CHOICES = [
        ("disponible", "Disponible"),
        ("reservado", "Reservado"),
        ("cancelado", "Cancelado"),
    ]
    fecha_turno = models.CharField(max_length=10,default='01-01-2024')
    hora_turno = models.CharField(max_length=10, default='00:00')
    id_usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    medico = models.ForeignKey(PersonalMedico, on_delete=models.CASCADE)
    entidad = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="disponible")
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f'{self.entidad}, {self.medico}, {self.fecha_turno}, {self.hora_turno}'

# Disponibilidad model
class Disponibilidad(models.Model):
    DAY_CHOICES = [
        ("lunes", "lunes"),
        ("martes", "martes"),
        ("miércoles", "miércoles"),
        ("jueves", "jueves"),
        ("viernes", "viernes"),
        ("sabado", "sabado"),
        ("domingo", "domingo"),
    ]
    medico = models.ForeignKey(PersonalMedico, on_delete=models.CASCADE)
    institucion = models.ForeignKey(Entidad, on_delete=models.CASCADE)
    dia = models.CharField(max_length=10, choices=DAY_CHOICES)
    hora_inicio_turnos = models.TimeField()
    hora_fin_turnos = models.TimeField()
    is_active = models.BooleanField(default=True)

# TrasplanteCruzado model
class TrasplanteCruzado(models.Model):
    paciente_cruzado = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    donante_cruzado = models.ForeignKey(Paciente, related_name='PacienteCruzado', on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=500)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.descripcion