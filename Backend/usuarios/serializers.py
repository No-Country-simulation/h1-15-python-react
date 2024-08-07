from rest_framework import serializers
from django.contrib.auth import get_user_model
from mail.views import registration_mail
from django.contrib.auth.password_validation import validate_password
from uuid import uuid4
from core.models import UserType
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Agrega campos personalizados al token si es necesario
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        
        #if user.user_types:
        data['id_user'] = user.id
        data['user_types'] = user.user_types.type_user
        data['first_login'] = user.first_login

        return data
    


User = get_user_model()

class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'type']  


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'first_name','last_name','user_types','is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        email = validated_data['email']
        user.username = email
        new_password = uuid4().hex
        user.set_password(new_password)
        registration_mail(user.email, new_password)
        user.is_active = True
        user.save()
        return user


class UserSerializerPatch(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)  # Extrae la contraseña si está en los datos validados
        instance = super().update(instance, validated_data)  # Actualiza los demás campos
        if password:
            instance.set_password(password)  # Aplica el hash a la contraseña
            instance.save()
        return instance




