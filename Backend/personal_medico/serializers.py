
from rest_framework import serializers
from core.models import PersonalMedico, Disponibilidad, PersonalMedicoReviews
from django.db.models import Avg
import os

class ReviewSerializer(serializers.ModelSerializer):
    id_personal_medico = serializers.PrimaryKeyRelatedField(queryset=PersonalMedico.objects.all(), write_only=True)

    class Meta:
        model = PersonalMedicoReviews
        fields = ['id', 'descripcion', 'calificacion', 'timestamp', 'id_personal_medico']



class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disponibilidad
        fields = ['dia', 'hora_inicio_turnos', 'hora_fin_turnos']

class PersonalMedicoSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    specialty = serializers.CharField(source='id_especialidad.descripcion')
    schedule = serializers.SerializerMethodField()
    whatsapp = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = PersonalMedico
        fields = ['id', 'name', 'specialty', 'reviews', 'photo', 'rating', 'descripcion', 'schedule', 'whatsapp']

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
    
    def get_reviews(self, obj):
        return PersonalMedicoReviews.objects.filter(id_personal_medico=obj).count()
    
    def get_rating(self, obj):
        reviews = PersonalMedicoReviews.objects.filter(id_personal_medico=obj)
        if reviews.exists():
            return round(reviews.aggregate(Avg('calificacion'))['calificacion__avg'], 2)
        return None  # Devuelve `None` si no hay calificaciones


class PersonalMedicoNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = PersonalMedico
        fields = ['id', 'id_user', 'id_especialidad', 'photo', 'descripcion', 'telefono_consulta', 'is_active']

