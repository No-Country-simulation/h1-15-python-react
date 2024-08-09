from rest_framework import serializers
from core.models import MedicalStaff, Availability, MedicalStaffReviews
from django.db.models import Avg


class ReviewSerializer(serializers.ModelSerializer):
    id_personal_medico = serializers.PrimaryKeyRelatedField(
        queryset=MedicalStaff.objects.all(), write_only=True)

    class Meta:
        model = MedicalStaffReviews
        fields = '__all__'


class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'


class MedicalStaffSerializer(serializers.ModelSerializer):
    specialty = serializers.StringRelatedField(read_only=True)
    schedule = serializers.SerializerMethodField()
    whatsapp = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = MedicalStaff
        # Cuando se implemente el almacenamiento de archivos debemos agregar 'documents' a la lista de campos
        fields = ['id', 'user', 'specialty', 'medical_license', 'consultation_phone',
                  'schedule', 'whatsapp', 'reviews', 'rating', 'is_active']

    def get_schedule(self, obj):
        availability = Availability.objects.filter(doctor=obj)
        schedule = {}

        for slot in availability:
            entity = slot.entity.description
            day = slot.dia.capitalize()

            # Asegurarse de que la institución esté en el diccionario
            if entity not in schedule:
                schedule[entity] = {}

            # Asegurarse de que el día esté en el diccionario de la institución
            if day not in schedule[entity]:
                schedule[entity][day] = []

            # Agregar los horarios a la lista del día
            schedule[entity][day].append([
                slot.hora_inicio_turnos.strftime("%I:%M %p"),
                slot.hora_fin_turnos.strftime("%I:%M %p")
            ])

        return schedule

    def get_whatsapp(self, obj):
        # Asegúrate de que este campo exista en tu perfil de usuario
        return obj.consultation_phone

    def get_reviews(self, obj):
        return MedicalStaffReviews.objects.filter(id_personal_medico=obj).count()

    def get_rating(self, obj):
        reviews = MedicalStaffReviews.objects.filter(id_personal_medico=obj)
        if reviews.exists():
            return round(reviews.aggregate(Avg('rating'))['rating__avg'], 2)
        return None  # Devuelve `None` si no hay calificaciones


class PersonalMedicoNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalStaff
        fields = '__all__'
