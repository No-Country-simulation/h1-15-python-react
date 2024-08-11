from core.models import Patient
from pacientes.serializers import PacienteSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.


class PacienteList(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
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
    queryset = Patient.objects.all()
    serializer_class = PacienteSerializer

    @extend_schema(
        tags=['Pacientes'],
        summary='Lista un paciente especifico',
        description="Entrega un paciente especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

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


class Verify_user(generics.ListAPIView):
    @extend_schema(
        tags=['Pacientes'],
        summary='Verifica si el usuario es paciente',
        description="Verifica si el usuario es paciente"
    )
    def get(self, request, *args, **kwargs):
        user = request.user
        
        # Verificar si el usuario está autenticado
        if not user.is_authenticated:
            return JsonResponse({'error': 'User is not authenticated'}, status=401)
        
        # Verificar si el usuario está registrado como paciente
        try:
            patient = Patient.objects.get(user=user)
            return JsonResponse({'is_patient': True, 'patient_id': patient.id}, status=200)
        except Patient.DoesNotExist:
            return JsonResponse({'is_patient': False}, status=200)