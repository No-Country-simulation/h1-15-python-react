from django.shortcuts import render

from rest_framework import generics
from core.models import AntecedenteMedico as ModeloCore
from antecedente_medico.serializers import AntecedenteMedicoSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Historia Clinica"


class HistoriaClinicaList(generics.ListCreateAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todos las historias clinicas',
        description="Trae a todos las historias clinicas"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea una historia clinica', 
        description='Crea una historia clinica'
        )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class  HistoriaClinicaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista una historia clinica especifica por id',
        description="Entrega una historia clinica especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una historia clinica por su id',
        description="Permite actualizar todos los datos de una historia clinica por su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una historia clinica por su id',
        description="Permite actualizar todos los datos de una historia clinica por su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina un antecedentes medicos',
        description="Elimina de la base de datos una historia clinica  con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
