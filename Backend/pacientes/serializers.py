from rest_framework.serializers import ModelSerializer
from core.models import Paciente
from usuarios.serializers import UserSerializer
from tratamientos.serializers import TratamientoSerializer
from patologias.serializers import PatologiaSerializer

# Serializers for Paciente model


class PacienteSerializer(ModelSerializer):
    user_reference = UserSerializer(read_only=True)
    treatment_reference = TratamientoSerializer(read_only=True, many=True)
    pathology_reference = PatologiaSerializer(read_only=True, many=True)

    class Meta:
        model = Paciente
        fields = '__all__'
