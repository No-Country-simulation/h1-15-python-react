
from rest_framework import serializers
from core.models import Specialty	 as Modelo
import os

class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
