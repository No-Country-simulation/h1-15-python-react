from rest_framework import serializers
from usuarios.serializers import UserSerializer
from core.models import InformacionPersonal

# Serializers for InformacionPersonal model


class InformacionPersonalSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    direcciones = serializers.StringRelatedField(read_only=True, many=True)

    class Meta:
        model = InformacionPersonal
        fields = '__all__'
