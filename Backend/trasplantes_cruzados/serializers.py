from rest_framework import serializers
from core.models import TrasplanteCruzado


# Serializers for TrasplanteCruzado model
class TrasplanteCruzadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrasplanteCruzado
        fields = '__all__'