from rest_framework import serializers
from django.contrib.auth import get_user_model
from mail.views import registration_mail
from django.contrib.auth.password_validation import validate_password
from uuid import uuid4


User = get_user_model()

# Serializers for User model


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', "is_active"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        new_password = uuid4().hex
        user.set_password(new_password)
        registration_mail(user.email, new_password)
        user.is_active = False
        user.save()
        return user
