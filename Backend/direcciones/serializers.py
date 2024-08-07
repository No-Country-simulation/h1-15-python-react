from rest_framework import serializers
from core.models import Address

# Serializers for Direccion model


class DireccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
