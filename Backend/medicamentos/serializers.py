
from rest_framework import serializers
from core.models import Medication


class medicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'
