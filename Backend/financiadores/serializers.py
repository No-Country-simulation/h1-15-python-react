
from rest_framework import serializers
from core.models import Financiador, FileUpload
import os

class FinanciadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financiador
        fields = '__all__'



class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ('id', 'file', 'uploaded_at')

        def validate_file(self, value):
            print("Validating file:", value.name)  # Añade esta línea
            ext = os.path.splitext(value.name)[1]
            valid_extensions = ['.xlsx', '.xls']
            if ext.lower() not in valid_extensions:
                raise serializers.ValidationError('Unsupported file extension. Allowed extensions are .xlsx, .xls')
            return value