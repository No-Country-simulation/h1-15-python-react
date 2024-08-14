from rest_framework import generics , status
from core.models import Nomenclador, FileUpload
from rest_framework.views import APIView
from rest_framework.response import Response
from nomencladores.serializers import NomencladorSerializer, FileUploadSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from drf_spectacular.utils import extend_schema

import pandas as pd
# Create your views here.

class NomencladorList(generics.ListCreateAPIView):
    queryset = Nomenclador.objects.all()
    serializer_class = NomencladorSerializer

    @extend_schema(
        tags=['Nomenclador'],
        summary='Lista todos los Nomenclador',
        description="Trae a todos los Nomenclador"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Nomenclador'],
        summary='Crea un Nomenclador',
        description="Crea un nuevo Nomenclador"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class NomencladorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Nomenclador.objects.all()
    serializer_class = NomencladorSerializer

    @extend_schema(
        tags=['Nomenclador'],
        summary='Lista un Nomenclador especifico por id',
        description="Entrega un Nomenclador especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Nomenclador'],
        summary='Modifica un Nomenclador',
        description="Permite actualizar todos los datos de un Nomenclador especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

    
    @extend_schema(
        tags=['Nomenclador'],
        summary='Modifica un Nomenclador',
        description="Permite actualizar todos los datos de un Nomenclador especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Nomenclador'],
        summary='Elimina un financiador',
        description="Elimina de la base de datos el financiador especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer

    @extend_schema(
        tags=['Nomenclador'],
        summary='subir archivo Nomenclador',
        description="Permite subir un archivo Nomenclador"
    )
    def post(self, request, *args, **kwargs):
        file_serializer = FileUploadSerializer(data=request.data)
        
        if file_serializer.is_valid():


            # Obtener el archivo subido
            file = request.FILES['file']
            
            file_instance = FileUpload(file=file)
            file_instance.save()
            # Leer el archivo con pandas
            try:
                df = pd.read_excel(file)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            # Eliminar todos los registros existentes en la tabla Nomenclador
            Nomenclador.objects.all().delete()
            
            # Iterar sobre las filas del DataFrame y guardar cada fila en la base de datos
            for _, row in df.iterrows():
                try:
                    arancel = row.get('ARANCEL', None)
                    if pd.isna(arancel) or arancel == '':
                        arancel = None
                    else:
                        arancel = int(arancel)

                    nomenclador = Nomenclador(
                        codigos= row.get('CODIGOS', ''),
                        descripcion= row.get('DESCRIPCION', ''),
                        arancel= arancel
                    )
                    nomenclador.save()
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
                    
            return Response({"message": "Archivo procesado y datos guardados correctamente"}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)