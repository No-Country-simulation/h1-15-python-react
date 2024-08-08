from rest_framework import serializers
from pacientes.serializers import PacienteSerializer
from direcciones.serializers import DireccionSerializer
from core.models import Patient, PersonalInfo, Address

# Serializers for InformacionPersonal model


class InformacionPersonalSerializer(serializers.ModelSerializer):
    patient = PacienteSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(), 
        source='patient', 
        write_only=True
    )
    address = DireccionSerializer(read_only=True)
    address_id = serializers.PrimaryKeyRelatedField(
        queryset=Address.objects.all(), 
        source='address', 
        write_only=True
    )

    class Meta:
        model = PersonalInfo
        fields = '__all__'
