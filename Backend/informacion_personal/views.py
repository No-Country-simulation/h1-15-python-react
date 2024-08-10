from informacion_personal.serializers import InformacionPersonalSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from core.models import InformacionPersonal

# Create your views here.


class InformacionPersonalList(generics.ListCreateAPIView):
    queryset = InformacionPersonal.objects.all()
    serializer_class = InformacionPersonalSerializer

    @extend_schema(
        tags=['Información Personal'],
        summary='Lista todos los información personal',
        description="Entrega un lista con de todos los información personal"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Información Personal'],
        summary='Crea un información personal',
        description="Crea un nuevo información personal"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class InformacionPersonalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = InformacionPersonal.objects.all()
    serializer_class = InformacionPersonalSerializer

    @extend_schema(
        tags=['Información Personal'],
        summary='Lista un información personal especifico',
        description="Entrega un información personal especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Información Personal'],
        summary='Modifica un información personal',
        description="Permite actualizar todos los datos de un información personal especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Información Personal'],
        summary='Elimina un información personal',
        description="Elimina de la base de datos el información personal especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    @extend_schema(
        tags=['Información Personal'],
        summary='Modifica parcialmente un información personal',
        description="Permite actualizar parcialmente un información personal especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
