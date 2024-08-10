from rest_framework import generics, views, status, response
from core.models import Medicamento, Patologia, Tratamiento, Farmacia
from medicamentos.serializers import MedicamentosSerializer as Serializador
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404

REFERENCIA_TAGS = "Medicamentos"
 

class MedicamentoListCreate(views.APIView):
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista todas los medicamentos',
        description="Trae a todas los medicamentos"
    )
    def get(self, request, format=None):
        queryset = Medicamento.objects.all()
        
        try:
            lista_medicamentos = []
            for medicamento in queryset:
                medicamento['dosis_presentacion'] = medicamento.get_dosis_presentacion()
                lista_medicamentos.append(medicamento)
                
            return response.Response(lista_medicamentos, status=status.HTTP_200_OK)
        except:
            return response.Response("Elementos no encontrados", status=status.HTTP_404_NOT_FOUND) 

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea un medicamento',
        description="""Crea un medicamento.\n
                    {
                        "patologia": "Hipertiroidismo",
                        "tratamiento": "Medicamentos antitiroideos",
                        "farmacia": "Elea",
                        "descripcion": "Medicamento para el tratamiento del hipertiroidismo.",
                        "dosis_presentacion": ["400mg", "600mg", "1000mg"],
                    }
                    """
    )
    def post(self, request):
        datos_solicitud = request.data
        
        try:
            patologia = get_object_or_404(Patologia, descripcion=datos_solicitud['patologia'])
            tratamiento = get_object_or_404(Tratamiento, descripcion=datos_solicitud['tratamiento'])
            farmacia = get_object_or_404(Farmacia, nombre_laboratorio=datos_solicitud['farmacia'])
            descripcion = datos_solicitud['descripcion']
            
        
            medicamento = Medicamento.objects.create(patologia=patologia, tratamiento=tratamiento, farmacia=farmacia, descripcion=descripcion)
            medicamento.set_dosis_presentacion(datos_solicitud['dosis_presentacion'])
            medicamento.save()
            return response.Response("Medicamento creado", status=status.HTTP_201_CREATED)
        except:
            return response.Response("Falló la creación", status=status.HTTP_400_BAD_REQUEST)


class  MedicamentoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicamento.objects.all()
    serializer_class = Serializador

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
        return self.destroy(request, *args, **kwargs)
