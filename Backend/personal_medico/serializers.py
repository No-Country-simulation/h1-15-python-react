from rest_framework import serializers
from core.models import MedicalStaff, Availability, MedicalStaffReviews
from django.db.models import Avg
from usuarios.serializers import UserSerializer

from drf_spectacular.utils import extend_schema_field

class ReviewSerializer(serializers.ModelSerializer):
    id_doctor = serializers.PrimaryKeyRelatedField(
        queryset=MedicalStaff.objects.all(), write_only=True)

    class Meta:
        model = MedicalStaffReviews
        fields = '__all__'

class ReviewSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = MedicalStaffReviews
        fields = ['description', 'rating']


class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = '__all__'


class MedicalStaffSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
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

    @extend_schema_field(serializers.DictField())
    def get_schedule(self, obj)-> dict:
        availability = Availability.objects.filter(doctor=obj)
        schedule = {}

        for slot in availability:
            entity = slot.entity.name
            day = slot.day.capitalize()

            # Asegurarse de que la institución esté en el diccionario
            if entity not in schedule:
                schedule[entity] = {}

            # Asegurarse de que el día esté en el diccionario de la institución
            if day not in schedule[entity]:
                schedule[entity][day] = []

            # Agregar los horarios a la lista del día
            schedule[entity][day].append([
                slot.start_time.strftime("%H:%M"),
                slot.end_time.strftime("%H:%M")
            ])

        return schedule
    @extend_schema_field(serializers.CharField())
    def get_whatsapp(self, obj) -> str:
        # Asegúrate de que este campo exista en tu perfil de usuario
        return obj.consultation_phone

    @extend_schema_field(serializers.IntegerField())
    def get_reviews(self, obj) -> int:
        return MedicalStaffReviews.objects.filter(medical_staff=obj).count()

    @extend_schema_field(serializers.FloatField())
    def get_rating(self, obj) -> float:
        reviews = MedicalStaffReviews.objects.filter(medical_staff=obj)
        if reviews.exists():
            return round(reviews.aggregate(Avg('rating'))['rating__avg'], 2)
        return None  # Devuelve `None` si no hay calificaciones


class PersonalMedicoNewSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalStaff
        fields = '__all__'
