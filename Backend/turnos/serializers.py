from rest_framework import serializers
from core.models import Availability,Appointment


# Serializers for Disponibilidad model
class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

# Serializers for Turno model
class TurnoSerializer(serializers.ModelSerializer):
    entidad = serializers.SerializerMethodField()
    medico = serializers.SerializerMethodField()
    id_usuario = serializers.SerializerMethodField()

    class Meta:
        model = Availability  
        fields = '__all__'
    
    def get_entidad(self, obj):
        return {
            "id": obj.entidad.id,
            "descripcion": obj.entidad.descripcion
        }
    
    def get_medico(self, obj):
        return {
            "id": obj.medico.id,
            "nombre_completo": obj.medico.nombre_completo,
            "tipo": obj.medico.id_especialidad.tipo,  
            "descripcion_especialidad": obj.medico.id_especialidad.descripcion
        }
    
    def get_id_usuario(self, obj):
        if obj.id_usuario is not None:
            return {
                "id": obj.id_usuario.id,
                "mail": obj.id_usuario.username
            }
        return None
    
class TurnoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id_usuario', 'status']