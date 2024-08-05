from django.contrib.auth import get_user_model
from mail.views import activation_mail
from usuarios.serializers import UserSerializer
from rest_framework import generics, permissions
from drf_spectacular.utils import extend_schema
from rest_framework.permissions import AllowAny

User = get_user_model()

0
# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


    @extend_schema(
        tags=['Usuarios'],
        summary='Lista todos los usuarios',
        description="Entrega un lista con de todos los usuarios"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Usuarios'],
        summary='Crea un usuario',
        description="Crea un usuario y válida el correo"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @extend_schema(
        tags=['Usuarios'],
        summary='Lista un usuario especifico',
        description="Entrega un usuario especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Usuarios'],
        summary='Modifica un usuario',
        description="Permite actualizar todos los datos de un usuario especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Usuarios'],
        summary='Elimina un usuario',
        description="Elimina de la base de datos el usuario especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    @extend_schema(
        tags=['Usuarios'],
        summary='Modifica un usuario',
        description="Permite modificar algún dato del usuario especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        user = User.objects.get(id=kwargs['pk'])
        activation_mail(user.email, request.data['password'])
        user.is_active = request.data['is_active']
        user.set_password(request.data['password'])
        user.save()
        return self.partial_update(request, *args, **kwargs)
