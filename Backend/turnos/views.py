from turnos.serializers import TurnoSerializer, DisponibilidadSerializer
from rest_framework import generics
from drf_spectacular.utils import extend_schema
from core.models import Turno, Disponibilidad


class DisponibilidadListCreate(generics.ListCreateAPIView):
    queryset = Disponibilidad.objects.all()
    serializer_class = DisponibilidadSerializer
    
    @extend_schema(
        tags=['Disponibilidad'],
        summary='Lista la disponibilidad de todos los médicos',
        description="Entrega un lista con la disponibilidad de todos los médicos"
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @extend_schema(
        tags=['Disponibilidad'],
        summary='Carga una nueva disponibilidad',
        description="Carga una nueva disponibilidad"
    )
    def post(self, request, *args, **kwargs):
        
        """
        data = request.get_json()
        fecha_j = data.get('fecha')
        fecha = datetime.strptime(fecha_j, '%Y-%m-%d').date()
        inicio_j = data.get('inicio')
        inicio = datetime.strptime(inicio_j, '%H:%M').time()
        fin_j = data.get('fin')
        fin = datetime.strptime(fin_j, '%H:%M').time()
        duracion = int(data.get('duracion'))

        try:
            hoy = datetime.now().date()

            consulta = Turn.query.filter_by(turn_date_date_assignment=fecha).first()

            if consulta:
                return jsonify({'message': 'Ya hay datos en la tabla para esta fecha'})
            else:
                hora_inicio_turnos = inicio
                while hora_inicio_turnos < fin:
                    hora_fin_turno = datetime.combine(datetime.min, hora_inicio_turnos) + timedelta(minutes=duracion)
                    hora_fin_turno = hora_fin_turno.time()

                    new_turn = Turn(
                        turn_int_user_id=id,
                        turn_date_creation_date=hoy,
                        turn_date_date_assignment=fecha,
                        turn_time_start_turn=hora_inicio_turnos,
                        turn_time_finish_turn=hora_fin_turno,
                        turn_bol_assigned=False
                    )

                    hora_inicio_turnos = hora_fin_turno
                    db.session.add(new_turn)

                db.session.commit()
                return jsonify({'message': 'Turnos habilitados exitosamente'})

        except Exception as e:
            print("Error:", e)
            return jsonify({"message": "Error en el servidor"})
        """
        
        return self.create(request, *args, **kwargs)

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