from rest_framework import generics
from core.models import ClinicalHistory as ModeloCore
from historia_clinica.serializers import HistorialMedicoSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Historia Clinica"


class ClinicalHistoryList(generics.ListCreateAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todas las historias clinicas',
        description="Trae a todas las historias clinicas"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea una hisotoria clinica',
        description="Crea una historia clinica"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class  ClinicalHistoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista una historia clinica especifica por id',
        description="Lista una historia clinica especifica por id"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una historia clinica especifica por id',
        description="Modifica una historia clinica especifica por id"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una historia clinica especifica por idd',
        description="Modifica una historia clinica especifica por id"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina una historia clinica',
        description="Elimina una historia clinica"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
