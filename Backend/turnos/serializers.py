from rest_framework import serializers
from core.models import Turno


# Serializers for Turno model
class TurnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        fields = '__all__'