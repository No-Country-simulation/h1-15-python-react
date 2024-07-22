from rest_framework import serializers
from core.models import Financiador

class FinanciadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financiador
        fields = '__all__'
