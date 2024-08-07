from rest_framework import serializers
from core.models import CrossTransplant


# Serializers for TrasplanteCruzado model
class TrasplanteCruzadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrossTransplant
        fields = '__all__'