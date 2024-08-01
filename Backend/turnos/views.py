from turnos.serializers import TurnoSerializer, DisponibilidadSerializer
from rest_framework import generics, views
from drf_spectacular.utils import extend_schema
from core.models import Turno, Disponibilidad
from custom_functions.date_list import validar_fechas, obtener_fecha_actual_str, generar_fecha_fin_str


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
                    Requiere el nombre del médico, de la institución; y día, hora de inicio de turnos, hora de fin de turnos en forma de lista.\n
                    Formato:\n
                    {
                        'medico': 'nombre medico',
                        'institucion': 'nombre institucion',
                        'horarios': {
                            1: ['lunes', '08:00', '12:00'],
                            2: ['martes', '08:00', '16:00'],
                            3: ['jueves', '10:00', '17:00'],
                            ...
                            },
                    }
                    """
    )
    def post(self, request):
        datos_solicitud = request.data
        medico = datos_solicitud['medico']
        institucion = datos_solicitud['institucion']
        horarios = datos_solicitud['horarios']
        lista_horarios = list(horarios.values())
        fecha_inicio = obtener_fecha_actual_str()
        fecha_fin = generar_fecha_fin_str(60)
        duracion_turnos = 15
        lista_turnos = validar_fechas(lista_horarios, fecha_inicio, fecha_fin, duracion_turnos)
        
        for horario in lista_horarios:
            dia = horario[0]
            hora_inicio = horario[1]
            hora_fin = horario[2]
            datos_disponibilidad = {
                'medico': medico,
                'institucion': institucion,
                'dia': dia,
                'hora_inicio_turnos': hora_inicio,
                'hora_fin_turnos': hora_fin,
            }
            disponibilidad_serializer = DisponibilidadSerializer(datos_disponibilidad)
            
            if disponibilidad_serializer.is_valid():
                disponibilidad_serializer.save()
        
        for dia in lista_horarios:
            for turno in dia:
                try:
                    Turno.objects.create(fecha_turno=turno[0], hora_turno=turno[1], medico=medico, institucion=institucion)
                except:
                    pass
                
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
    
class TurnoListCreate(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer

    @extend_schema(
        tags=['turno'],
        summary='Lista todos los turnos',
        description="Entrega un lista con de todos los turnos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['turno'],
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
            return("Trasplante Cruzado no encontrado")

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