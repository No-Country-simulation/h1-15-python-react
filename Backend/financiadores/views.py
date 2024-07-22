from django.shortcuts import render
from rest_framework import generics
from core.models import Financiador
from financiadores.serializers import FinanciadorSerializer
from drf_spectacular.utils import extend_schema
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
