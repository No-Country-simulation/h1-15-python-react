from rest_framework import generics , status
from core.models import PersonalMedico, PersonalMedicoReviews
from rest_framework.views import APIView
from rest_framework.response import Response
from personal_medico.serializers import PersonalMedicoSerializer, PersonalMedicoNewSerializer, ReviewSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from drf_spectacular.utils import extend_schema



class PersonalMedicoList(generics.ListCreateAPIView):
    queryset = PersonalMedico.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PersonalMedicoNewSerializer
        return PersonalMedicoSerializer

    @extend_schema(
        tags=['Personal Medico'],
        summary='Lista todos los medicos',
        description="Trae a todos los medicos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Personal Medico'],
        summary='Crea un Medico',
        description="Crea un nuevo Medico"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PersonalMedicoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PersonalMedico.objects.all()
    serializer_class = PersonalMedicoSerializer

    @extend_schema(
        tags=['Personal Medico'],
        summary='Lista un medico especifico por id',
        description="Entrega un medico especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Personal Medico'],
        summary='Modifica un medico',
        description="Permite actualizar todos los datos de un medico especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Personal Medico'],
        summary='Modifica un medico por su id',
        description="Permite actualizar todos los datos de un medico por su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


    @extend_schema(
        tags=['Personal Medico'],
        summary='Elimina un medico',
        description="Elimina de la base de datos el medico especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class CalificaPersonalMedicoList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return PersonalMedicoReviews.objects.filter(id_personal_medico=self.kwargs['pk'])

    def perform_create(self, serializer):
        # Obtener el id_personal_medico de la URL
        id_personal_medico = self.kwargs['pk']
        personal_medico_instance = PersonalMedico.objects.get(id=id_personal_medico)
        serializer.save(id_personal_medico=personal_medico_instance)


    @extend_schema(
        tags=['Calificaciones a personal Medico'],
        summary='Lista todas las calificaciones medicas',
        description="Lista todas las calificaciones medicas"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Calificaciones a personal Medico'],
        summary='Graba una nueva calificacion medica',
        description="Crea una nueva calificacion Medica"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)