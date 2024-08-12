
from rest_framework import serializers
from core.models import Financer #, FileUpload
import os

class FinanciadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financer 
        fields = '__all__'


