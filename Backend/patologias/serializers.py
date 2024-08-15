from rest_framework import serializers
from core.models import Pathology


class PathologySerializer(serializers.ModelSerializer):

    class Meta:
        model = Pathology
        fields = '__all__'

class ViewPathologySerializer(serializers.ModelSerializer):
    specialty = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Pathology
        fields = ['id', 'name', 'specialty', 'description', 'is_active']
