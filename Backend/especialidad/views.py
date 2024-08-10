from rest_framework import generics
from core.models import Especialidad as ModeloCore
from especialidad.serializers import EspecialidadSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Especialidad"


class EspecialidadList(generics.ListCreateAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todas las especialidades',
        description="Trae a todas las especialidades"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea una especialidad',
        description="Crea una especialidad"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class EspecialidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista una especialidad especifica por id',
        description="Entrega una especialidad especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una especialidad',
        description="Permite actualizar todos los datos de una especialidad con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una especialidad',
        description="Permite actualizar todos los datos de una especialidad por su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina un medico',
        description="Elimina de la base de datos una especialidad con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
