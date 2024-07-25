from rest_framework import serializers
from core.models import Turno, Disponibilidad


# Serializers for Disponibilidad model
class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disponibilidad
        fields = '__all__'

# Serializers for Turno model
class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'