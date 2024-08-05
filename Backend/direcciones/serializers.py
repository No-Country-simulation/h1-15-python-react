from rest_framework import serializers
from core.models import Direccion

# Serializers for Direccion model


class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direccion
        fields = '__all__'
