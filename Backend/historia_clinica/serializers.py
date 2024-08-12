
from rest_framework import serializers
from core.models import ClinicalHistory
import os

class ClinicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalHistory
        fields = '__all__'
