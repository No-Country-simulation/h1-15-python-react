from rest_framework import serializers
from core.models import Availability,Appointment
from entidad.serializers import EntidadSerializer
from personal_medico.serializers import PersonalMedicoSerializer
from usuarios.serializers import UserSerializer


# Serializers for Disponibilidad model
class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

# Serializers for Turno model
class TurnoSerializer(serializers.ModelSerializer):
    entity = EntidadSerializer(read_only=True)
    #doctor = PersonalMedicoSerializer(read_only=True)
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Availability  
        fields = '__all__'

class TurnoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['user', 'status']