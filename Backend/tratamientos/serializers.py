from rest_framework import serializers
from core.models import Treatment, TreatAdherence


# Serializers for Treatment model
class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = '__all__'
        
class ViewTreatmentSerializer(serializers.ModelSerializer):
    pathology = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Treatment
        fields = ['id', 'treat_name', 'pathology', 'treat_type', 'treat_medication', 'treat_indications', 'create_by', 'is_active']    

# Serializers for Treatment model
class TreatAdherenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatAdherence
        fields = '__all__'
