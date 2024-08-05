from trasplantes_cruzados.serializers import TrasplanteCruzadoSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from core.models import TrasplanteCruzado


class TrasplanteCruzadoList(generics.ListCreateAPIView):
    queryset = TrasplanteCruzado.objects.all()
    serializer_class = TrasplanteCruzadoSerializer

    @extend_schema(
        tags=['Trasplante Cruzado'],
        summary='Lista todos los trasplantes cruzados',
        description="Entrega un lista con de todos los trasplantes cruzados"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Trasplante Cruzado'],
        summary='Crea un trasplante cruzado',
        description="Crea un nuevo trasplante cruzado"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class TrasplanteCruzadoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrasplanteCruzado.objects.all()
    serializer_class = TrasplanteCruzadoSerializer

    @extend_schema(
        tags=['Trasplante Cruzado'],
        summary='Lista un trasplante cruzado especifico por id',
        description="Entrega un trasplante cruzado especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Trasplante Cruzado'],
        summary='Modifica un trasplante cruzado',
        description="Permite actualizar todos los datos de un trasplante cruzado especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Trasplante Cruzado'],
        summary='Elimina un trasplante cruzado',
        description="Elimina de la base de datos el trasplante cruzado especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return instance
        else:
            return("Trasplante Cruzado no encontrado")