from rest_framework import serializers
from usuarios.serializers import UserSerializer
from core.models import InformacionPersonal

# Serializers for InformacionPersonal model


class InformacionPersonalSerializer(serializers.ModelSerializer):
    user_reference = UserSerializer(read_only=True)

    class Meta:
        model = InformacionPersonal
        fields = '__all__'
