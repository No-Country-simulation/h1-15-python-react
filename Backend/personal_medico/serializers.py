
from rest_framework import serializers
from core.models import PersonalMedico, Disponibilidad
import os



class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disponibilidad
        fields = ['dia', 'hora_inicio_turnos', 'hora_fin_turnos']

class PersonalMedicoSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    specialty = serializers.CharField(source='id_especialidad.descripcion')
    schedule = serializers.SerializerMethodField()
    whatsapp = serializers.SerializerMethodField()

    class Meta:
        model = PersonalMedico
        fields = ['id', 'name', 'specialty', 'descripcion', 'schedule', 'whatsapp']
        #fields = ['id', 'name', 'specialty', 'reviews', 'photo', 'rating', 'description', 'schedule', 'whatsapp']

    def get_name(self, obj):
        return f"Dr. {obj.id_user.first_name} {obj.id_user.last_name}"
    
    def get_schedule(self, obj):
        availability = Disponibilidad.objects.filter(medico=obj)
        schedule = {}
        for slot in availability:
            day = slot.dia.capitalize()
            schedule[day] = [slot.hora_inicio_turnos.strftime("%I:%M %p"), slot.hora_fin_turnos.strftime("%I:%M %p")]
        return schedule

   
    def get_whatsapp(self, obj):
        return obj.telefono_consulta  # Asegúrate de que este campo exista en tu perfil de usuario
    


class PersonalMedicoNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalMedico
        fields = ['id', 'id_user', 'id_especialidad', 'descripcion', 'telefono_consulta', 'is_active']

