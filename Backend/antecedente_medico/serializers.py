
from rest_framework import serializers
from core.models import AntecedenteClinico as Modelo
import os

class AntecedenteMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
