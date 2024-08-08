from rest_framework.serializers import ModelSerializer
from core.models import Patient, User, Financer
from usuarios.serializers import UserSerializer
from rest_framework import serializers
from typing import Optional

# Serializers for Paciente model


class PacienteSerializer(ModelSerializer):
    user = UserSerializer(read_only=True) 
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), 
        source='user', 
        write_only=True
    )
    financer_id = serializers.PrimaryKeyRelatedField(
        queryset=Financer.objects.all(),
        source='financer', 
        write_only=True
    )
    financer = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = '__all__'

    def get_financer(self, obj) -> Optional[str]:
            return obj.financer.description if obj.financer else None