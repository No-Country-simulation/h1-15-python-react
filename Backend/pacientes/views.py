from core.models import Paciente
from pacientes.serializers import PacienteSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema

# Create your views here.


class PacienteList(generics.ListCreateAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    @extend_schema(
        tags=['Pacientes'],
        summary='Lista todos los pacientes',
        description="Entrega un lista con de todos los pacientes"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Pacientes'],
        summary='Crea un paciente',
        description="Crea un nuevo paciente"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PacienteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    @extend_schema(
        tags=['Pacientes'],
        summary='Lista un paciente especifico',
        description="Entrega un paciente especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Pacientes'],
        summary='Modifica un paciente',
        description="Permite actualizar todos los datos de un paciente especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Pacientes'],
        summary='Modifica parcialmente un paciente',
        description="Permite actualizar parcialmente un paciente especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @extend_schema(
        tags=['Pacientes'],
        summary='Elimina un paciente',
        description="Elimina de la base de datos el paciente especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
