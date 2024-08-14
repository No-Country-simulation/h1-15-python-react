from rest_framework import generics
from core.models import AntecedenteMedico as ModeloCore
from antecedente_medico.serializers import AntecedenteMedicoSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Antecedente Medico"


class AntecedenteMedicoList(generics.ListCreateAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todos los antecedentes medicos',
        description="Trae a todos los antecedentes medicos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea un antecedente medico',
        description="Crea un antecedente medico"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class  AntecedenteMedicoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista un antecedente medico especifica por id',
        description="Entrega un antecedente medico especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica un antecedente medico por su id',
        description="Permite actualizar todos los datos de un antecedente medico por su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica un antecedente medico por su id',
        description="Permite actualizar todos los datos de un antecedente medico por su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina un antecedentes medicos',
        description="Elimina de la base de datos un antecedentes medicos con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
