from tipo_usuario.serializers import TipoUsuarioSerializer
from rest_framework import generics
from core.models import TipoUsuario
from drf_spectacular.utils import extend_schema

# Create your views here.


class TipoUsuarioList(generics.ListCreateAPIView):
    queryset = TipoUsuario.objects.all()
    serializer_class = TipoUsuarioSerializer

    @extend_schema(
        tags=['Tipos de usuario'],
        summary='Lista todos los tipos de usuario',
        description="Entrega un lista con de todos los tipos de usuario"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Tipos de usuario'],
        summary='Crea un tipo de usuario',
        description="Crea un nuevo tipo de usuario"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TipoUsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TipoUsuario.objects.all()
    serializer_class = TipoUsuarioSerializer

    @extend_schema(
        tags=['Tipos de usuario'],
        summary='Lista un tipo de usuario especifico',
        description="Entrega un tipo de usuario especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Tipos de usuario'],
        summary='Modifica un tipo de usuario',
        description="Permite actualizar todos los datos de un tipo de usuario especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Tipos de usuario'],
        summary='Modifica parcialmente un tipo de usuario',
        description="Permite actualizar parcialmente un tipo de usuario especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @extend_schema(
        tags=['Tipos de usuario'],
        summary='Elimina un tipo de usuario',
        description="Elimina de la base de datos el tipo de usuario especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
