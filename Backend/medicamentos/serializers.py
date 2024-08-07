
from rest_framework import serializers
from core.models import Medication as Modelo
import os

class MedicamentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
