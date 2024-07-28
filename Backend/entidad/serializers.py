
from rest_framework import serializers
from core.models import Entidad as Modelo
import os

class EntidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
