from tratamientos.serializers import TreatmentSerializer, TreatAdherenceSerializer
from rest_framework import generics, views, status, response
from drf_spectacular.utils import extend_schema
from core.models import Treatment, TreatAdherence, Patient
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta


import json


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


class TreatAdherenceCreate(views.APIView):
    @extend_schema(
        tags=['Adherencia a Tratamientos'],
        summary='Carga el nuevo tratamiento del paciente',
        description="""Carga el nuevo tratamiento del paciente a partir del cual se valida la adherencia.\n
                    {
                        "patient": "2",
                        "treatment": "Medicación: Prednizona 10mg c/6hs",
                        "start_datetime": "2024-08-10 18:00:00", 
                        "treat_duration": "90",   # Días
                        "treat_frecuency": 6,   # Horas
                    }
                    """
    )
    def post(self, request):
        request_data = request.data

        patient = get_object_or_404(Patient, id=request_data['patient'])
        treatment = get_object_or_404(Treatment, treat_name=request_data['treatment'])
        start_datetime = datetime.strptime(request_data['start_datetime'], '%Y-%m-%d %H:%m:%s')
        treat_duration = int(request_data['treat_duration'])
        treat_frecuency = int(request_data['treat_frecuency'])
        end_datetime = start_datetime + timedelta(days=treat_duration)
        
        frecuency_list = []
        errors = []
        
        now_datetime = start_datetime
        while now_datetime <= end_datetime:
            frecuency_list.append([now_datetime, False])
            now_datetime += timedelta(hours=treat_frecuency)
        
        treat_adherence = json.dumps(frecuency_list)
        trat_adherence_data = {
            'patient': patient.id,
            'treatment': treatment.id,
            'start_datetime': start_datetime.strftime('%Y-%m-%d %H:%m:%s'),
            'treat_duration': str(treat_duration),
            'treat_frecuency': str(treat_frecuency),
            'treat_adherence': treat_adherence
        }
        treat_adherence_serializer = TreatAdherenceSerializer(data=trat_adherence_data)
        
        if frecuency_list:
            if treat_adherence_serializer.is_valid():
                treat_adherence_serializer.save()
            else:
                errors.append(treat_adherence_serializer.errors)
        else:
            errors.append("Error al crear la lista de adherencia al tratamiento.")
        
        if errors:
            return response.Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        

        return response.Response({"message": "Disponibilidad creada con éxito."}, status=status.HTTP_201_CREATED)