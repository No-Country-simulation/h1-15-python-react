
from rest_framework import serializers
from core.models import Farmacia as Modelo
import os

class FarmaciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modelo
        fields = '__all__'
