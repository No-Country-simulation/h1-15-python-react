from rest_framework import serializers
from core.models import Tratamiento

# Serializers for Tratamiento model


class TratamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tratamiento
        fields = '__all__'
