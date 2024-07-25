from rest_framework import serializers
from core.models import TipoUsuario

# Serializers for TipoUsuario model


class TipoUsuarioSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    group = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TipoUsuario
        fields = '__all__'
