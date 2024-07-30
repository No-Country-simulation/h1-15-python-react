
from rest_framework import serializers
from core.models import HistoriaClinica as Modelo
import os

class HistoriaClinicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
