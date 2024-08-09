from tratamientos.serializers import TreatmentSerializer, TreatAdherenceSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from core.models import Treatment, TreatAdherence


class TreatmentList(generics.ListCreateAPIView):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

    @extend_schema(
        tags=['Tratamientos'],
        summary='Lista todos los tratamientos',
        description="Entrega un lista con de todos los tratamientos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Tratamientos'],
        summary='Crea un tratamiento',
        description="Crea un nuevo tratamiento tratamiento"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TreatmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

    @extend_schema(
        tags=['Tratamientos'],
        summary='Lista un tratamiento especifico',
        description="Entrega un tratamiento especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Tratamientos'],
        summary='Modifica un tratamiento',
        description="Permite actualizar todos los datos de un tratamiento especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Tratamientos'],
        summary='Modifica parcialmente un tratamiento',
        description="Permite actualizar parcialmente un tratamiento especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @extend_schema(
        tags=['Tratamientos'],
        summary='Elimina un tratamiento',
        description="Elimina de la base de datos el tratamiento especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
