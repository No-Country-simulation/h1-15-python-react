from rest_framework import generics, status, response
from core.models import Pathology, Nomenclature, Specialty
from patologias.serializers import PathologySerializer
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404


class PathologyList(generics.ListCreateAPIView):
    queryset = Pathology.objects.all()
    serializer_class = PathologySerializer

    @extend_schema(
        tags=['Patologia'],
        summary=f'Lista todas las patologias',
        description="Trae a todas las patologias"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Patologia'],
        summary='Crea una patologia',
        description="""
            Crea una nueva patologia para una especialidad específica.
            
            Args:
                {
                    "name": "Hipertiroidismo",
                    "specialty": "Endocrinología",
                    "nomenclature": "", (Datos no disponibles, es un código de nomenclador)
                    "description": "Se caracteriza por hipermetabolismo y aumento de las concentraciones séricas de hormonas tiroideas libres.",
                }
            
            Returns:
                str: info
        """
    )
    def post(self, request):
        request_data = request.data
        specialty_name = request_data.pop('specialty')
        nomenclature_code = request_data.pop('nomenclature')
        
        specialty = get_object_or_404(Specialty, name=specialty_name)
        nomenclature = get_object_or_404(Nomenclature, name=nomenclature_code)
        
        request_data['specialty'] = specialty.id
        request_data['nomenclature'] = nomenclature.id
        pathology_serializer = PathologySerializer(data=request_data)
        
        if pathology_serializer.is_valid():
            pathology_serializer.save()
            return response.Response(pathology_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return response.Response(pathology_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PathologyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pathology.objects.all()
    serializer_class = PathologySerializer

    @extend_schema(
        tags=['Patologia'],
        summary='Lista una patologia especifica por id',
        description="Entrega una patologia especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Patologia'],
        summary='Modifica una patologia',
        description="Permite actualizar todos los datos de una patologia con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Patologia'],
        summary='Elimina una farmacia',
        description="Elimina de la base de datos una patologia con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return response.Response(instance, status=status.HTTP_200_OK)
        else:
            return response.Response("Tratamiento no encontrado", status=status.HTTP_400_BAD_REQUEST)