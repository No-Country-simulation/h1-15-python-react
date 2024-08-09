from rest_framework import serializers
from patologias.serializers import PatologiaSerializer
from core.models import Treatment

# Serializers for Tratamiento model


class TreatmentSerializer(serializers.ModelSerializer):
    pathology_reference = PatologiaSerializer(read_only=True, many=True)

    class Meta:
        model = Treatment
        fields = '__all__'
