from rest_framework import generics
from core.models import Farmacia as ModeloCore
from farmacia.serializers import FarmaciasSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Farmacias"


class FarmaciaList(generics.ListCreateAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todas las farmacias',
        description="Trae a todas las farmacias"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea una farmacia',
        description="Crea una farmacia"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class FarmaciaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista una farmacia especifica por id',
        description="Entrega una farmacia especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una farmacia',
        description="Permite actualizar todos los datos de una farmacia con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina una farmacia',
        description="Elimina de la base de datos una farmacia con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
