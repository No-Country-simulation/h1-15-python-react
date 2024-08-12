from rest_framework import generics, views, status, response
from core.models import Medication, Pathology, Treatment, Pharmacy
from medicamentos.serializers import medicationsSerializer
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404

REFERENCIA_TAGS = "Medicamentos"
 

class MedicationListCreate(views.APIView):
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista todas los medicamentos',
        description="Trae a todas los medicamentos"
    )
    def get(self, request, format=None):
        queryset = Medication.objects.all()
        
        try:
            medications_list = []
            for medication in queryset:
                medication['dosis_presentacion'] = medication.get_dosage_form()
                medications_list.append(medication)
                
            return response.Response(medications_list, status=status.HTTP_200_OK)
        except:
            return response.Response("Elementos no encontrados", status=status.HTTP_404_NOT_FOUND) 

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea un medicamento',
        description="""Crea un medicamento.\n
                    {
                        "pathology": "Hipertiroidismo",
                        "treatment": "Medicamentos antitiroideos",
                        "pharmacy": "Elea",
                        "description": "Medicamento para el tratamiento del hipertiroidismo.",
                        "dosage_form": ["400mg", "600mg", "1000mg"],
                    }
                    """
    )
    def post(self, request):
        request_data = request.data
        
        try:
            pathology = get_object_or_404(Pathology, descripcion=request_data['pathology'])
            treatment = get_object_or_404(Treatment, descripcion=request_data['treatment'])
            pharmacy = get_object_or_404(Pharmacy, nombre_laboratorio=request_data['pharmacy'])
            description = request_data['description']
            
        
            medicine = Medication.objects.create(pathology=pathology, treatment=treatment, pharmacy=pharmacy, description=description)
            medicine.set_dosage_form(request_data['dosage_form'])
            medicine.save()
            return response.Response("Medicamento creado", status=status.HTTP_201_CREATED)
        except:
            return response.Response("Falló la creación", status=status.HTTP_400_BAD_REQUEST)


class  MedicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medication.objects.all()
    serializer_class = medicationsSerializer

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista un medicamento especificado por id',
        description="Entrega un medicamento especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica un medicamento',
        description="Permite actualizar todos los datos de un medicamento con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica un medicamento',
        description="Permite actualizar todos los datos de un medicamento con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina un medicamento',
        description="Elimina de la base de datos un medicamento con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return response.Response(instance, status=status.HTTP_200_OK)
        else:
            return response.Response("Tratamiento no encontrado", status=status.HTTP_400_BAD_REQUEST)
