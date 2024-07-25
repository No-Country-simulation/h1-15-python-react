from core.models import Direccion
from direcciones.serializers import DireccionSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema

# Create your views here.


class DireccionList(generics.ListCreateAPIView):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer

    @extend_schema(
        tags=['Direcciones'],
        summary='Lista todos las direcciones',
        description="Entrega un lista con de todos las direcciones"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Direcciones'],
        summary='Crea una nueva direccion',
        description="Crea una nueva direccion"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class DireccionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer

    @extend_schema(
        tags=['Direcciones'],
        summary='Lista una direccion especifica',
        description="Entrega una direccion especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Direcciones'],
        summary='Modifica una direccion',
        description="Permite actualizar todos los datos de una direccion especificada con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Direcciones'],
        summary='Modifica parcialmente una direccion',
        description="Permite actualizar parcialmente una direccion especificada con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @extend_schema(
        tags=['Direcciones'],
        summary='Elimina una direccion',
        description="Elimina una direccion especificada con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
