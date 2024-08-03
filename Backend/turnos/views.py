from turnos.serializers import TurnoSerializer, DisponibilidadSerializer
from rest_framework import generics, views
from drf_spectacular.utils import extend_schema
from core.models import Turno, Disponibilidad, PersonalMedico, Entidad
from custom_functions.date_list import validar_fechas, obtener_fecha_actual_str, generar_fecha_fin_str
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta


class DisponibilidadList(generics.ListAPIView):
    queryset = Disponibilidad.objects.all()
    serializer_class = DisponibilidadSerializer
    
    @extend_schema(
        tags=['Disponibilidad'],
        summary='Lista la disponibilidad de todos los médicos',
        description="Entrega una lista con la disponibilidad de todos los médicos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class DisponibilidadCreate(views.APIView):
    @extend_schema(
        tags=['Disponibilidad'],
        summary='Carga la disponibilidad del médico',
        description="""Carga una nueva disponibilidad para el médico a partir de la cual se generan los turnos.\n
                    {
                        "medico": "2",
                        "institucion": "Mater Dei",
                        "horarios": [
                            ["lunes", "08:00", "12:00"],
                            ["martes", "08:00", "16:00"],
                            ["jueves", "10:00", "17:00"]
                        ]
                    }
                    """
    )
    def post(self, request):
        datos_solicitud = request.data
        medico = datos_solicitud['medico']

        medico = get_object_or_404(PersonalMedico, id=datos_solicitud['medico'])
        institucion = get_object_or_404(Entidad, descripcion=datos_solicitud['institucion'])

        horarios = datos_solicitud['horarios']
        lista_horarios = horarios
        fecha_inicio = obtener_fecha_actual_str()
        fecha_fin = generar_fecha_fin_str(3)
        duracion_turnos = 15
        lista_turnos = validar_fechas(lista_horarios, fecha_inicio, fecha_fin, duracion_turnos)
        errores = []

        for horario in lista_horarios:
            dia = horario[0]
            hora_inicio = horario[1]
            hora_fin = horario[2]
            datos_disponibilidad = {
                'medico': medico.id,
                'institucion': institucion.id,
                'dia': dia,
                'hora_inicio_turnos': hora_inicio,
                'hora_fin_turnos': hora_fin,
            }
            disponibilidad_serializer = DisponibilidadSerializer(data=datos_disponibilidad)
            
            if disponibilidad_serializer.is_valid():
                disponibilidad_serializer.save()
            else:
                errores.append(disponibilidad_serializer.errors)
            
        if errores:
            return Response({"errors": errores}, status=status.HTTP_400_BAD_REQUEST)
        

        return Response({"message": "Disponibilidad creada con éxito."}, status=status.HTTP_201_CREATED)  
    
class DisponibilidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Disponibilidad.objects.all()
    serializer_class = DisponibilidadSerializer

    @extend_schema(
        tags=['Disponibilidad'],
        summary='Lista la disponibilidad especificada por id',
        description="Entrega la disponibilidad especificada con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Disponibilidad'],
        summary='Modifica la disponibilidad especificada',
        description="Permite actualizar todos los datos de una disponibilidad especificada con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Disponibilidad'],
        summary='Elimina una disponibilidad especificada',
        description="Elimina de la base de datos una disponibilidad especificada con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return instance
        else:
            return("Trasplante Cruzado no encontrado")
    

class TurnoCreate(generics.CreateAPIView):
    @extend_schema(
        tags=['Turno'],
        summary='Genera turnos de un medico entre dos fechas',
        description="""Genera los turnos entre la fecha inicial, la fecha final, y la duración de los turnos\n
        creacion de turnos en disponibilidad por el medico

        Args:
            {
                "medico": "2",
                "institucion": "Mater Dei",
                "fecha_inicio": "2024-08-01",
                "fecha_fin": "2024-08-10",
                "duracion_turnos": "15"
            }

        Returns:
            str: info
        """
    )
    def post(self, request):
        
        datos_solicitud = request.data
        medico_id = datos_solicitud['medico']
        institucion_desc = datos_solicitud['institucion']

        medico = get_object_or_404(PersonalMedico, id=medico_id)
        institucion = get_object_or_404(Entidad, descripcion=institucion_desc)

        disponibilidad = Disponibilidad.objects.filter(medico=medico, institucion=institucion)

        if not disponibilidad.exists():
            return Response({"message": "No hay disponibilidad registrada para el médico en esta institución."}, status=status.HTTP_400_BAD_REQUEST)

        fecha_inicio = datetime.strptime(datos_solicitud['fecha_inicio'], '%Y-%m-%d')
        fecha_fin = datetime.strptime(datos_solicitud['fecha_fin'], '%Y-%m-%d')
        duracion_turnos = int(datos_solicitud['duracion_turnos'])  # asumiendo que es un entero en minutos

        turnos_creados = 0

        # Diccionario de mapeo de días de la semana a números
        dias_a_numeros = {
            'lunes': 0,
            'martes': 1,
            'miércoles': 2,
            'jueves': 3,
            'viernes': 4,
            'sábado': 5,
            'domingo': 6
        }

        while fecha_inicio <= fecha_fin:
            for disp in disponibilidad:
                if dias_a_numeros[disp.dia.lower()] == fecha_inicio.weekday():
                    hora_inicio = disp.hora_inicio_turnos  # Ya es un objeto time
                    hora_fin = disp.hora_fin_turnos  # Ya es un objeto time

                    hora_actual = datetime.combine(fecha_inicio, hora_inicio)
                    while hora_actual.time() < hora_fin:
                        hora_fin_datetime = datetime.combine(fecha_inicio, hora_fin)
                        if hora_actual + timedelta(minutes=duracion_turnos) <= hora_fin_datetime:
                            Turno.objects.create(
                                medico=medico,
                                entidad=institucion,  # Cambiado a 'entidad'
                                fecha_turno=fecha_inicio.strftime('%Y-%m-%d'),  # Cambiado a 'fecha_turno'
                                hora_turno=hora_actual.time().strftime('%H:%M'),  # Cambiado a 'hora_turno'
                                status='disponible'  # O el valor que prefieras
                            )
                            turnos_creados += 1
                        hora_actual += timedelta(minutes=duracion_turnos)
            fecha_inicio += timedelta(days=1)

        if turnos_creados > 0:
            return Response({"message": "Turnos creados con éxito."}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "No se crearon turnos."}, status=status.HTTP_400_BAD_REQUEST)
        
        
class TurnoListCreate(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer

    @extend_schema(
        tags=['Turno'],
        summary='Lista todos los turnos',
        description="Entrega un lista con de todos los turnos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Turno'],
        summary='Asigna el turno seleccionado',
        description="Reserva el turno seleccionado al paciente"
    )
    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        patient = request.POST['paciente']
        if not instance.paciente:
            instance.paciente = patient
            instance.save()
            return instance
        else:
            return("Turno no encontrado")

class TurnoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turno.objects.all()
    serializer_class = DisponibilidadSerializer

    @extend_schema(
        tags=['Turno'],
        summary='Lista un turno especificado por id',
        description="Entrega un turno especificado con su numero de ID"
    )
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @extend_schema(
        tags=['Turno'],
        summary='Modifica un turno especificado',
        description="Permite actualizar todos los datos de un turno especificado con su numero de ID"
    )
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @extend_schema(
        tags=['Turno'],
        summary='Elimina un turno especificado',
        description="Elimina de la base de datos un turno especificado con su numero de ID"
    )
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_active:
            instance.is_active = False
            instance.save()
            return instance
        else:
            return("Trasplante Cruzado no encontrado")