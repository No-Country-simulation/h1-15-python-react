from rest_framework.serializers import ModelSerializer
from core.models import Paciente
from usuarios.serializers import UserSerializer


class PacienteSerializer(ModelSerializer):
    user_reference = UserSerializer(read_only=True)
    
    class Meta:
        model = Paciente
        fields = '__all__'
