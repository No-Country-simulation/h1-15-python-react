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
        tags=['financiadores'],
        summary='Modifica un financiador',
        description="Permite actualizar todos los datos de un financiador especificado con su numero de ID"
    )
    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    

    @extend_schema(
        tags=['financiadores'],
        summary='Elimina un financiador',
        description="Elimina de la base de datos el financiador especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
