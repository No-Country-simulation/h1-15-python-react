from tratamientos.serializers import TreatmentSerializer, TreatAdherenceSerializer
from rest_framework import generics, views, status, response
from drf_spectacular.utils import extend_schema
from core.models import Treatment, TreatAdherence, Patient, Pathology, Medication
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta


import json


class TreatmentList(generics.ListCreateAPIView):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

    @extend_schema(
        tags=['Tratamientos'],
        summary='Lista todos los tratamientos',
        description="Entrega una lista con de todos los tratamientos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Tratamientos'],
        summary='Crea un tratamiento',
        description="""
            Crea un nuevo tratamiento para una patología específica.
            
            Args:
                {
                    "treat_name": "Tionamidas MMI 10mg",
                    "pathology": "Hipertiroidismo",
                    "treat_type": "Medicación",
                    "treat_duration": "60", (días)
                    "treat_medication": "Metimazol 10mg",
                    "treat_indications": "Una dosis cada 24hs con el almuerzo"
                }
            
            Returns:
                str: info
        """
    )
    def post(self, request):
        request_data = request.data
        pathology_name = request_data.pop('pathology')
        treat_medication_name = request_data.pop('treat_medication')
        
        pathology = get_object_or_404(Pathology, name=pathology_name)
        treat_medication = get_object_or_404(Medication, name=treat_medication_name)
        
        request_data['pathology'] = pathology.id
        request_data['treat_medication'] = treat_medication.id
        treatment_serializer = TreatmentSerializer(data=request_data)
        
        if treatment_serializer.is_valid():
            treatment_serializer.save()
            return response.Response(treatment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return response.Response(treatment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


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
    def delete(self, request):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return response.Response(instance, status=status.HTTP_200_OK)
        else:
            return response.Response("Tratamiento no encontrado", status=status.HTTP_400_BAD_REQUEST)


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
        treat_adherence_data = {
            'patient': patient.id,
            'treatment': treatment.id,
            'start_datetime': start_datetime.strftime('%Y-%m-%d %H:%m:%s'),
            'treat_duration': str(treat_duration),
            'treat_frecuency': str(treat_frecuency),
            'treat_adherence': treat_adherence
        }
        treat_adherence_serializer = TreatAdherenceSerializer(data=treat_adherence_data)
        
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

class TreatAdherenceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TreatAdherence.objects.all()
    serializer_class = TreatAdherenceSerializer

    @extend_schema(
        tags=['Adherencia a Tratamientos'],
        summary='Lista un tratamiento especifico',
        description="Entrega un tratamiento especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Adherencia a Tratamientos'],
        summary='Modifica un tratamiento',
        description="Permite actualizar todos los datos de un tratamiento especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Adherencia a Tratamientos'],
        summary='Modifica parcialmente un tratamiento',
        description="Permite actualizar parcialmente un tratamiento especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    @extend_schema(
        tags=['Adherencia a Tratamientos'],
        summary='Elimina un tratamiento',
        description="Elimina de la base de datos el tratamiento especificado con su numero de ID"
    )
    def delete(self, request):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return response.Response(instance, status=status.HTTP_200_OK)
        else:
            return response.Response("Tratamiento no encontrado", status=status.HTTP_400_BAD_REQUEST)