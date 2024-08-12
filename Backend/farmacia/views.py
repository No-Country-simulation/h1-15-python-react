from rest_framework import generics
from core.models import Pharmacy
from farmacia.serializers import PharmacySerializer
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Farmacias"


class PharmacyList(generics.ListCreateAPIView):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer

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


class PharmacyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pharmacy.objects.all()
    serializer_class = PharmacySerializer

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
