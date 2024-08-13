from tratamientos.serializers import TreatmentSerializer, TreatAdherenceSerializer
from historia_clinica.serializers import ClinicalHistorySerializer
from rest_framework import serializers, generics, views, status, response
from drf_spectacular.utils import extend_schema, inline_serializer, OpenApiExample
from core.models import Treatment, TreatAdherence, Patient, Pathology, Medication, ClinicalHistory, Entity, MedicalStaff
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
        description="""Crea un nuevo tratamiento para una patología específica. 
        Si es un tratamiento estandar, create_by va en blanco. Si es creado por un médico va su id.
        """,
        request=inline_serializer(
            name="TreatmentRequest",
            fields={
                'treat_name': serializers.CharField(),
                'pathology': serializers.CharField(),
                'treat_type': serializers.CharField(),
                'treat_medication': serializers.CharField(),
                'treat_indications': serializers.CharField(),
                'create_by': serializers.IntegerField()
            }
        ),
        examples=[
            OpenApiExample(
                'Ejemplo creación tratamiento',
                value={
                    "treat_name": "Danantizol 5mg cada 24hs",
                    "pathology": "Hipertiroidismo",
                    "treat_type": "Custom",
                    "treat_medication": "Danantizol",
                    "treat_indications": "Una dosis cada 24hs con el almuerzo",
                    "create_by": 1 
                },
                request_only=True,  # Muestra esto solo en la solicitud
                response_only=False  # No muestra esto en la respuesta
            )
        ]
    )
    def post(self, request):
        request_data = request.data
        pathology_name = request_data.pop('pathology')
        
        if request_data['treat_medication']:
            treat_medication_name = request_data.pop('treat_medication')
            treat_medication = get_object_or_404(Medication, medication_name=treat_medication_name)
            request_data['treat_medication'] = treat_medication.id
        
        pathology = get_object_or_404(Pathology, name=pathology_name)
        request_data['pathology'] = pathology.id
        
        if request_data['create_by']:
            create_by_id = request_data.pop('create_by')
            create_by = get_object_or_404(MedicalStaff, id=create_by_id)
            request_data['create_by'] = create_by.id
        
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
        description="""Carga los datos de la consulta en la historia clínica y el nuevo tratamiento del paciente a partir del cual se valida la adherencia.
        Toma al médico que atendió de los datos de autenticación.
        """,
        request=inline_serializer(
            name="TreatAdherenceRequest",
            fields={
                'patient:id': serializers.IntegerField(),
                'entity': serializers.CharField(),
                'date_of_attention': serializers.DateField(),
                'pathology': serializers.CharField(),
                'medical_studies': serializers.CharField(),
                'attention_observations': serializers.CharField(),
                'treatment': serializers.CharField(),
                'start_datetime': serializers.DateTimeField(),
                'treat_duration': serializers.IntegerField(),
                'treat_frecuency': serializers.IntegerField()
            }
        ),
        examples=[
            OpenApiExample(
                'Ejemplo carga en historia clínica y creación adherencia',
                value={
                    "patient": "2",
                    "entity": "Mater Dei",
                    "date_of_attention": "2024-08-09",
                    "pathology": "Hipertiroidismo",
                    "medical_studies": "",
                    "attention_observations": "Se observa debilidad muscular, perdida de peso, temblor en manos. Se refuerza diagnóstico con Prueba de TSH, T3 y T4.",
                    "treatment": "Danantizol 5mg cada 24hs",
                    "start_datetime": "2024-08-10 18:00:00", 
                    "treat_duration": "60",
                    "treat_frecuency": "24", 
                },
                request_only=True,  # Muestra esto solo en la solicitud
                response_only=False  # No muestra esto en la respuesta
            )
        ]
    )
    def post(self, request):
        request_data = request.data
        
        user = request.user
        
        if not user.is_authenticated:
            return response.Response("Usuario no autenticado", status=status.HTTP_401_UNAUTHORIZED)
            #doctor = get_object_or_404(MedicalStaff, id=1)
        else:        
            doctor = MedicalStaff.objects.filter(user=user).first()

        patient = get_object_or_404(Patient, id=request_data['patient'])
        entity = get_object_or_404(Entity, name=request_data['entity'])
        date_of_attention_obj = datetime.strptime(request_data['date_of_attention'], "%Y-%m-%d")
        date_of_attention = date_of_attention_obj.date()
        pathology = get_object_or_404(Pathology, name=request_data['pathology'])
        medical_studies = request_data['medical_studies']
        attention_observations = request_data['attention_observations']
        treatment = get_object_or_404(Treatment, treat_name=request_data['treatment'])
        start_datetime = datetime.strptime(request_data['start_datetime'], '%Y-%m-%d %H:%M:%S')
        treat_duration = int(request_data['treat_duration'])
        treat_frecuency = int(request_data['treat_frecuency'])
        end_datetime = start_datetime + timedelta(days=treat_duration)
        
        frecuency_list = []
        errors = []
        
        now_datetime = start_datetime
        while now_datetime <= end_datetime:
            frecuency_list.append([str(now_datetime), False])
            now_datetime += timedelta(hours=treat_frecuency)
        
        treat_adherence = json.dumps(frecuency_list)
        treat_adherence_data = {
            'patient': patient.id,
            'treatment': treatment.id,
            'start_datetime': start_datetime.strftime('%Y-%m-%d %H:%M:%S'),
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
        
        clinical_history_data = {
            "patient": patient,
            "entity": entity,
            "doctor": doctor,
            "date_of_attention": date_of_attention,
            "pathology": pathology,
            "medical_studies": medical_studies,
            "attention_observations": attention_observations,
            "treatment": treatment
        }
        clinical_history_serializer = ClinicalHistorySerializer(data=clinical_history_data)
        
        if clinical_history_serializer.is_valid():
            clinical_history_serializer.save()
        else:
            errors.append(clinical_history_serializer.errors)
        
        if errors:
            return response.Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        

        return response.Response({"message": "Tratamiento cargado con éxito, historial médico actualizado."}, status=status.HTTP_201_CREATED)


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

        
class MyTreatAdherenceDetail(views.APIView):
    
    @extend_schema(
        tags=['Adherencia a Tratamientos'],
        summary='Lista los tratamientos del usuario logueado',
        description="Entrega una lista con los tratamientos del usuario logueado"
    )
    def get(self, request):
        
        user = request.user
        
        if not user.is_authenticated:
            return response.Response("Usuario no autenticado", status=status.HTTP_401_UNAUTHORIZED)
        
        patient = Patient.objects.filter(user=user).first()
        
        queryset = TreatAdherence.objects.filter(patient=patient)
        serializer = TreatAdherenceSerializer(queryset, many=True)

        return response.Response(serializer.data, status=status.HTTP_200_OK)