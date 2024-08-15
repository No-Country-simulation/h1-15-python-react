from rest_framework import generics
from core.models import Entity as ModeloCore
from entidad.serializers import EntidadSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Entidad"


class EntidadList(generics.ListAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todas las entidades',
        description="Trae a todas las entidades"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class  EntidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista una entidad especifica por id',
        description="Entrega una entidad especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una entidad por su id',
        description="Permite actualizar todos los datos de una entidad por su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una entidad por su id',
        description="Permite actualizar todos los datos de una entidad por su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina una entidad s',
        description="Elimina de la base de datos una entidad con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
