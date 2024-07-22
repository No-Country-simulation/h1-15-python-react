from rest_framework import serializers
from patologias.serializers import PatologiaSerializer
from core.models import Tratamiento

# Serializers for Tratamiento model


class TratamientoSerializer(serializers.ModelSerializer):
    pathology_reference = PatologiaSerializer(read_only=True, many=True)

    class Meta:
        model = Tratamiento
        fields = '__all__'
