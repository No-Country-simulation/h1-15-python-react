from rest_framework import generics
from core.models import Patologia
from patologias.serializers import PatologiaSerializer
from drf_spectacular.utils import extend_schema


class PatologiaList(generics.ListCreateAPIView):
    queryset = Patologia.objects.all()
    serializer_class = PatologiaSerializer

    @extend_schema(
        tags=['Patologia'],
        summary=f'Lista todas las patologias',
        description="Trae a todas las patologias"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Patologia'],
        summary='Crea una patologia',
        description="Crea una patologia"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PatologiaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patologia.objects.all()
    serializer_class = PatologiaSerializer

    @extend_schema(
        tags=['Patologia'],
        summary='Lista una patologia especifica por id',
        description="Entrega una patologia especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Patologia'],
        summary='Modifica una patologia',
        description="Permite actualizar todos los datos de una patologia con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Patologia'],
        summary='Elimina una farmacia',
        description="Elimina de la base de datos una patologia con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)