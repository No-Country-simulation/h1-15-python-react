from rest_framework import generics
from core.models import TipoDocumento as ModeloCore
from tipo_documento.serializers import TipoDocumentoSerializer as Serializador
from drf_spectacular.utils import extend_schema

REFERENCIA_TAGS = "Tipo de Documentos"


class TipoDocumentoList(generics.ListCreateAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary=f'Lista todas los tipo de documentos',
        description="Trae a todas los tipo de documentos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Crea un tipo de documento',
        description="Crea un tipo de documento"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class  TipoDocumentoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ModeloCore.objects.all()
    serializer_class = Serializador

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Lista un tipo de documento especifica por id',
        description="Entrega un tipo de documento especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una tipo de documento',
        description="Permite actualizar todos los datos de un tipo de documento con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Modifica una tipo de documento',
        description="Permite actualizar todos los datos de un tipo de documento con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=[REFERENCIA_TAGS],
        summary='Elimina un tipo de documento',
        description="Elimina de la base de datos un tipo de documento con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
