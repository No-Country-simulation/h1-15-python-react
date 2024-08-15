
from rest_framework import serializers
from core.models import DocumentType as Modelo
import os

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
