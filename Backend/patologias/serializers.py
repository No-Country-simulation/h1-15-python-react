from rest_framework import serializers
from core.models import Pathology


# Serializers for Patologia model


class PatologiaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pathology
        fields = '__all__'
