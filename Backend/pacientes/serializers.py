from rest_framework.serializers import ModelSerializer
from core.models import Patient
from usuarios.serializers import UserSerializer
from rest_framework import serializers
from typing import Optional

# Serializers for Paciente model


class PacienteSerializer(ModelSerializer):
    #user_reference = UserSerializer(read_only=True)
    financer_description = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = '__all__'

    def get_financer_description(self, obj) -> Optional[str]:
            return obj.financer.description if obj.financer else None