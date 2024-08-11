from rest_framework import generics, status
from core.models import MedicalStaff, MedicalStaffReviews
from personal_medico.serializers import MedicalStaffSerializer, ReviewSerializer, PersonalMedicoNewSerializer
from drf_spectacular.utils import extend_schema


class PersonalMedicoList(generics.ListCreateAPIView):
    queryset = MedicalStaff.objects.all()
    serializer_class = PersonalMedicoNewSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PersonalMedicoNewSerializer
        return MedicalStaffSerializer

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
    queryset = MedicalStaff.objects.all()
    serializer_class = MedicalStaffSerializer

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
        return MedicalStaffReviews.objects.filter(id_personal_medico=self.kwargs['pk'])

    def perform_create(self, serializer):
        # Obtener el id_personal_medico de la URL
        id_personal_medico = self.kwargs['pk']
        personal_medico_instance = MedicalStaff.objects.get(
            id=id_personal_medico)
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
        summary='Califica a un medico',
        description="Agregas una calificación a un medico"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
