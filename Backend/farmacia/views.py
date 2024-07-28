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
        summary=f'Lista todas los medicamentos',
        description="Trae a todas los medicamentos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea un medicamento',
        description="Crea un medicamento"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class FarmaciaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista un medicamento especifica por id',
        description="Entrega un medicamento especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una especialidad',
        description="Permite actualizar todos los datos de un medicamento con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina un medico',
        description="Elimina de la base de datos un medicamento con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
