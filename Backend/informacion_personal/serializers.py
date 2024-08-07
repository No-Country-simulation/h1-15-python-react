from rest_framework import serializers
from usuarios.serializers import UserSerializer
from core.models import PersonalInfo

# Serializers for InformacionPersonal model


class InformacionPersonalSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    direcciones = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = PersonalInfo
        fields = '__all__'
