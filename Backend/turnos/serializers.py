from rest_framework import serializers
from core.models import Availability, Appointment, Patient, MedicalHistory
from pacientes.serializers import PacienteSerializer
from entidad.serializers import EntidadSerializer
from personal_medico.serializers import MedicalStaffSerializer
from antecedente_medico.serializers import AntecedenteMedicoSerializer
from usuarios.serializers import UserSerializer


# Serializers for Disponibilidad model
class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'

# Serializers for Turno model
class TurnoSerializer(serializers.ModelSerializer):
    entity = EntidadSerializer(read_only=True)
    #doctor = MedicalStaffSerializer(read_only=True)
    #user = UserSerializer(read_only=True) 
    patient = serializers.SerializerMethodField()
    medicalhistory = serializers.SerializerMethodField()


    class Meta:
        model = Appointment  
        fields = '__all__'

    def get_patient(self, obj):
        try:
            patient = Patient.objects.get(user=obj.user)
            return PacienteSerializer(patient).data
        except Patient.DoesNotExist:
            return None
        
    def get_medicalhistory(self,obj):
        try:
            patient = Patient.objects.get(user=obj.user)
            medicalhistory = MedicalHistory.objects.get(patient=patient.id)
            return AntecedenteMedicoSerializer(medicalhistory).data
        except Patient.DoesNotExist:
            return None
        except MedicalHistory.DoesNotExist:
            return None

class TurnoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['user', 'status', 'reason_for_visit']


class TurnoSerializerListaCombo(serializers.ModelSerializer):
    entity_name = serializers.CharField(source='entity.name', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'appointment_date', 'appointment_time', 'entity_name']