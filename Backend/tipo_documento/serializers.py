
from rest_framework import serializers
from core.models import TipoDocumento as Modelo
import os

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
