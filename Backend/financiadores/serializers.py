
from rest_framework import serializers
from core.models import Financiador#, FileUpload
import os

class FinanciadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financiador
        fields = '__all__'


