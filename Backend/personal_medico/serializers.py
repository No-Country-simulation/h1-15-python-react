
from rest_framework import serializers
from core.models import MedicalStaff, Availability, MedicalStaffReviews
from django.db.models import Avg
import os

class ReviewSerializer(serializers.ModelSerializer):
    id_personal_medico = serializers.PrimaryKeyRelatedField(queryset=MedicalStaff.objects.all(), write_only=True)

    class Meta:
        model = MedicalStaffReviews
        fields = ['id', 'descripcion', 'calificacion', 'timestamp', 'id_personal_medico']



class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['dia', 'hora_inicio_turnos', 'hora_fin_turnos']

class PersonalMedicoSerializer(serializers.ModelSerializer):
    specialty = serializers.CharField(source='id_especialidad.descripcion')
    schedule = serializers.SerializerMethodField()
    whatsapp = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = MedicalStaff
        fields = ['id', 'nombre_completo', 'specialty', 'reviews', 'photo', 'rating', 'descripcion', 'schedule', 'whatsapp']

    def get_schedule(self, obj):
        availability = Availability.objects.filter(medico=obj)
        schedule = {}

        for slot in availability:
            institucion = slot.institucion.descripcion
            day = slot.dia.capitalize()
            
            # Asegurarse de que la institución esté en el diccionario
            if institucion not in schedule:
                schedule[institucion] = {}

            # Asegurarse de que el día esté en el diccionario de la institución
            if day not in schedule[institucion]:
                schedule[institucion][day] = []

            # Agregar los horarios a la lista del día
            schedule[institucion][day].append([
                slot.hora_inicio_turnos.strftime("%I:%M %p"),
                slot.hora_fin_turnos.strftime("%I:%M %p")
            ])

        return schedule

   
    def get_whatsapp(self, obj):
        return obj.telefono_consulta  # Asegúrate de que este campo exista en tu perfil de usuario
    
    def get_reviews(self, obj):
        return MedicalStaffReviews.objects.filter(id_personal_medico=obj).count()
    
    def get_rating(self, obj):
        reviews = MedicalStaffReviews.objects.filter(id_personal_medico=obj)
        if reviews.exists():
            return round(reviews.aggregate(Avg('calificacion'))['calificacion__avg'], 2)
        return None  # Devuelve `None` si no hay calificaciones


class PersonalMedicoNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalStaff
        fields = ['id', 'nombre_completo','id_user', 'id_especialidad', 'photo', 'descripcion', 'telefono_consulta', 'is_active']

