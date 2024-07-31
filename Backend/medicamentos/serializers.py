
from rest_framework import serializers
from core.models import Medicamento as Modelo
import os

class MedicamentosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
