from rest_framework import serializers
from patologias.serializers import PathologySerializer
from core.models import Treatment, TreatAdherence

# Serializers for Treatment model
class TreatmentSerializer(serializers.ModelSerializer):
    pathology_reference = PathologySerializer(read_only=True, many=True)

    class Meta:
        model = Treatment
        fields = '__all__'
    

# Serializers for Treatment model
class TreatAdherenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatAdherence
        fields = '__all__'
