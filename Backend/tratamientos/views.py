from tratamientos.serializers import TratamientoSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from core.models import Tratamiento

# Create your views here.


class TratamientoList(generics.ListCreateAPIView):
    queryset = Tratamiento.objects.all()
    serializer_class = TratamientoSerializer

    @extend_schema(
        tags=['tratamiento'],
        summary='Lista todos los tratamientos',
        description="Entrega un lista con de todos los tratamientos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['tratamiento'],
        summary='Crea un tratamiento',
        description="Crea un nuevo tratamiento tratamiento"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TratamientoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tratamiento.objects.all()
    serializer_class = TratamientoSerializer

    @extend_schema(
        tags=['tratamiento'],
        summary='Lista un tratamiento especifico',
        description="Entrega un tratamiento especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['tratamiento'],
        summary='Modifica un tratamiento',
        description="Permite actualizar todos los datos de un tratamiento especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['tratamiento'],
        summary='Elimina un tratamiento',
        description="Elimina de la base de datos el tratamiento especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
