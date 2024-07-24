from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from core.models import Financiador #, FileUpload
from rest_framework.response import Response
from financiadores.serializers import FinanciadorSerializer#, FileUploadSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from drf_spectacular.utils import extend_schema
import os
import pandas as pd
# Create your views here.

class FinanciadoresList(generics.ListCreateAPIView):
    queryset = Financiador.objects.all()
    serializer_class = FinanciadorSerializer

    @extend_schema(
        tags=['financiadores'],
        summary='Lista todos los financiadores',
        description="Trae a todos los financiadores"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['financiadores'],
        summary='Crea un financiador',
        description="Crea un nuevo financiador"
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class FinanciadoresDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Financiador.objects.all()
    serializer_class = FinanciadorSerializer

    @extend_schema(
        tags=['financiadores'],
        summary='Lista un financiador especifico por id',
        description="Entrega un financiador especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['financiadores'],
        summary='Modifica un financiador',
        description="Permite actualizar todos los datos de un financiador especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['financiador'],
        summary='Elimina un financiador',
        description="Elimina de la base de datos el financiador especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

"""
class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    @extend_schema(
        tags=['financiadores'],
        summary='subir archivo financiadores',
        description="Permite subir un archivo financiadores"
    )
    def post(self, request, *args, **kwargs):
        file_serializer = FileUploadSerializer(data=request.data)
        
        if file_serializer.is_valid():


            # Obtener el archivo subido
            file = request.FILES['file']
            
            # Leer el archivo con pandas
            try:
                df = pd.read_excel(file)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            # Iterar sobre las filas del DataFrame y guardar cada financiador en la base de datos
            for _, row in df.iterrows():
                try:
                    financiador = Financiador(
                        id_personal_medico=row.get('id_personal_medico', ''),
                        descripcion=row.get('descripcion', ''),
                        is_active=row.get('is_active', '')
                    )
                    financiador.save()
                except Exception as e:
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Archivo procesado y datos guardados correctamente"}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            """