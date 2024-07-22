from turnos.serializers import TurnoSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from core.models import Turno


class TurnoList(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer

    @extend_schema(
        tags=['turno'],
        summary='Lista todos los turnos',
        description="Entrega un lista con de todos los turnos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['turno'],
        summary='Crea un turno',
        description="Crea un nuevo turno"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
