from turnos.serializers import TurnoSerializer, DisponibilidadSerializer
from rest_framework import generics, views
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes,  OpenApiResponse
from core.models import Appointment, Availability, MedicalStaff, Entity, User
from custom_functions.date_list import validate_dates, get_current_date_str, generate_end_date_str
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from rest_framework.exceptions import APIException
from drf_spectacular.utils import extend_schema, inline_serializer, OpenApiExample
from rest_framework import serializers, status, views

class CustomBadRequest(APIException):
    status_code = 400
    default_detail = 'Solicitud incorrecta'
    default_code = 'bad_request'


class TurnoListView(generics.ListAPIView):
    serializer_class = TurnoSerializer

    def get_queryset(self):
        status = self.request.query_params.get('status', None)
        queryset = Appointment.objects.all()
        if status:
            queryset = queryset.filter(status=status)
        medico = self.request.query_params.get('doctor_id',None)
        if medico:
            queryset = queryset.filter(medico=medico)
        fecha = self.request.query_params.get('fecha',None)
        if fecha:
            queryset = queryset.filter(fecha_turno=fecha)
        return queryset
    
    @extend_schema(
        tags=['Turno'],
        summary='Lista los turnos disponibles ',
        description=(
    "Este endpoint permite obtener una lista de turnos disponibles, con la posibilidad de aplicar filtros por "
    "estado del turno, médico asignado y fecha específica. Utiliza este endpoint para consultar la disponibilidad "
    "de turnos según los parámetros que se detallan a continuación.\n\n"
    "Ejemplos de uso:\n\n"
    "`/api/turnos/?status=disponible&doctor_id=2&fecha=2024-08-06 `\n\n"
    "`/api/turnos/?status=disponible&doctor_id=2`\n\n"
    "`/api/turnos/?fecha=2024-08-06`\n"
    ),
        parameters=[
            OpenApiParameter(
                name='status',
                description='Filtra los turnos por estado. Ejemplos: disponible, ocupado, cancelado.',
                required=False,
                type=OpenApiTypes.STR,
            ),
            OpenApiParameter(
                name='doctor_id',
                description='Filtra los turnos por el ID del médico. Debe ser un número entero.',
                required=False,
                type=OpenApiTypes.INT,
            ),
            OpenApiParameter(
                name='fecha',
                description='Filtra los turnos por fecha. Formato: AAAA-MM-DD.',
                required=False,
                type=OpenApiTypes.DATE,
            ),
        ],
        responses={
            200: TurnoSerializer(many=True),
            400: OpenApiResponse(description='Solicitud incorrecta', response=CustomBadRequest),
        },
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
class MisTurnoListView(generics.ListAPIView): #LO TENGO QUE PROBAR
    serializer_class = TurnoSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            # Maneja el caso de usuario no autenticado si es necesario
            return Appointment.objects.none()  # O lanza una excepción, etc.
        queryset = Appointment.objects.filter(id_usuario=user)
        return queryset
    
    @extend_schema(
        tags=['MisTurnos'],
        summary='Lista los turnos de un usuario ',
        description=(
    "Este endpoint permite obtener una lista de turnos pedidos y cerrados de un usuario.\n\n"
    "Ejemplos de uso:\n\n"
    "`/api/mis_turnos/ `\n\n"
    "`/api/mis_turnos/?status=reservado`\n\n"
    "`/api/turnos/?fecha=2024-08-06`\n"
    ),
        parameters=[
            OpenApiParameter(
                name='status',
                description='Filtra los turnos por estado. Ejemplos: disponible, ocupado, cancelado.',
                required=False,
                type=OpenApiTypes.STR,
            )
        ],
        responses={
            200: TurnoSerializer(many=True),
            400: 'Solicitud incorrecta',
        },
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
class ReservarTurnoView(generics.UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = TurnoSerializer

    @extend_schema(
        tags=['MisTurnos'],
        summary='Reserva un turno específico',
        description=(
            "Este endpoint permite a un usuario reservar un turno específico por ID.\n\n"
            "Para reservar un turno, el usuario debe enviar una solicitud PATCH con el ID del turno.\n\n"
            "Ejemplo de uso:\n\n"
            "`PATCH /api/reservar_turno/{id_turno}/`\n\n"
            "Cuerpo de la solicitud:\n"
            "{\n"
            "  \"status\": \"reservado\"\n"
            "}\n\n"
            "Además, permite que un doctor reserve un turno a nombre de otro usuario, especificando el ID del usuario en el cuerpo de la solicitud.\n\n"
            "Ejemplo de uso:\n\n"
            "Cuerpo de la solicitud:\n"
            "{\n"
            "  \"status\": \"reservado\",\n"
            "  \"id_usuario\": 2\"\n"
            "}\n"
        ),
        request=TurnoSerializer,
        
        responses={
            200: TurnoSerializer,
            400: OpenApiResponse(description='Solicitud incorrecta', response=CustomBadRequest),
            401: 'No autorizado',
            404: 'Turno no encontrado',
        },
    )
    def patch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "Autenticación requerida."}, status=status.HTTP_401_UNAUTHORIZED)

        appointment = self.get_object()
        if appointment.user:
            return Response({"detail": "El turno ya está reservado."}, status=status.HTTP_400_BAD_REQUEST)

        # Asigna el usuario autenticado al turno o utiliza el usuario enviado en la solicitud
        id_user = request.data.get('id_user', None)
        if id_user is None:
            id_user = request.user
        else:
            try:
                user_obj = User.objects.get(id=id_user)  # Obtener instancia de User
            except:
                return Response({"detail": "El usuario no existe."}, status=status.HTTP_400_BAD_REQUEST)

        appointment.user = user_obj
        appointment.status = request.data.get('status', 'reservado')
        appointment.save()

        serializer = self.get_serializer(appointment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_update(self, serializer):
        serializer.save()



class DisponibilidadList(generics.ListAPIView):
    queryset = Availability.objects.all()
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
        description="""Carga una nueva disponibilidad para el médico a partir de la cual se generan los turnos.""",
        request=inline_serializer(
            name='DisponibilidadRequest',
            fields={
                'doctor:id': serializers.IntegerField(),
                'entity': serializers.CharField(),
                'schedules': serializers.ListField(
                    child=serializers.ListField(
                        child=serializers.CharField()
                    )
                ),
            }
        ),
        examples=[
            OpenApiExample(
                'Example Disponibilidad Request',
                value={
                    "doctor_id": 2,
                    "entity": "Mater Dei",
                    "schedules": [
                        ["lunes", "08:00", "12:00"],
                        ["martes", "08:00", "16:00"],
                        ["jueves", "10:00", "17:00"]
                    ]
                },
                request_only=True,  # Muestra esto solo en la solicitud
                response_only=False  # No muestra esto en la respuesta
            )
        ]
    )
    def post(self, request):
        request_data = request.data
        doctor = request_data['doctor_id']

        doctor = get_object_or_404(MedicalStaff, id=request_data['doctor_id'])
        entity = get_object_or_404(Entity, name=request_data['entity'])
    
        schedule_list = request_data['schedules']
        
        errors = []
        print(f'es es el id de la entidad{entity.id}')
        for schedule in schedule_list:
            day = schedule[0]
            start_time = schedule[1]
            end_time = schedule[2]
            availability_data = {
                'doctor': doctor.id,
                'entity': entity.id,
                'day': day,
                'start_time': start_time,
                'end_time': end_time,
            }
            availability_serializer = DisponibilidadSerializer(data=availability_data)
            
            if availability_serializer.is_valid():
                availability_serializer.save()
            else:
                errors.append(availability_serializer.errors)
            
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Availability created successfully."}, status=status.HTTP_201_CREATED)
    
class DisponibilidadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Availability.objects.all()
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
                "doctor_id": "2",
                "entity": "Mater Dei",
                "date_init": "2024-08-01",
                "date_end": "2024-08-10",
                "appointment_duration": "15"
            }

        Returns:
            str: info
        """
    )
    def post(self, request):
        
        data_request = request.data
        doctor_id = data_request['doctor_id']
        entity = data_request['entity']

        doctor = get_object_or_404(MedicalStaff, id=doctor_id)
        entity = get_object_or_404(Entity, descripcion=entity)

        availability = Availability.objects.filter(doctor=doctor, entity=entity)

        if not availability.exists():
            return Response({"message": "No hay disponibilidad registrada para el médico en esta institución."}, status=status.HTTP_400_BAD_REQUEST)

        date_init = datetime.strptime(data_request['date_init'], '%Y-%m-%d')
        date_end = datetime.strptime(data_request['date_end'], '%Y-%m-%d')
        appointment_duration = int(data_request['appointment_duration'])  # asumiendo que es un entero en minutos

        created_appointments = 0

        # Diccionario de mapeo de días de la semana a números
        days_to_numbers = {
            'lunes': 0,
            'martes': 1,
            'miércoles': 2,
            'jueves': 3,
            'viernes': 4,
            'sábado': 5,
            'domingo': 6
        }
        while date_init <= date_end:
            for avail in availability:
                if days_to_numbers[avail.day.lower()] == date_init.weekday():
                    start_time = avail.start_time_appointments  # Already a time object
                    end_time = avail.end_time_appointments  # Already a time object

                    current_time = datetime.combine(date_init, start_time)
                    while current_time.time() < end_time:
                        end_time_datetime = datetime.combine(date_init, end_time)
                        if current_time + timedelta(minutes=appointment_duration) <= end_time_datetime:
                            Appointment.objects.create(
                                doctor=doctor,
                                entity=entity,  # Changed to 'entity'
                                appointment_date=date_init.strftime('%Y-%m-%d'),  # Changed to 'appointment_date'
                                appointment_time=current_time.time().strftime('%H:%M'),  # Changed to 'appointment_time'
                                status='available'  # Or the value you prefer
                            )
                            created_appointments += 1
                        current_time += timedelta(minutes=appointment_duration)
            date_init += timedelta(days=1)

        if created_appointments > 0:
            return Response({"message": "Turnos creados con éxito. {created_appointments}"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "No se crearon turnos."}, status=status.HTTP_400_BAD_REQUEST)
        
        















"""class TurnoListCreate(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
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
        patient = request.POST['patient']
        if not instance.paciente:
            instance.paciente = patient
            instance.save()
            return instance
        else:
            return("Turno no encontrado")"""

class TurnoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = TurnoSerializer

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
            return("Turno eliminado")