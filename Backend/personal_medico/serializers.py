
from rest_framework import serializers
from core.models import PersonalMedico
import os

class PersonalMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalMedico
        fields = '__all__'
