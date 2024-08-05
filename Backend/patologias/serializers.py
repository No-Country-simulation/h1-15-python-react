from rest_framework import serializers
from core.models import Patologia


# Serializers for Patologia model


class PatologiaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patologia
        fields = '__all__'
