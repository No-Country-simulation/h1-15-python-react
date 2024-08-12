
from rest_framework import serializers
from core.models import ClinicalHistory as Modelo
import os

class HistorialMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
