from datetime import datetime, timedelta


basedatos = [
    ["lunes","08:00","17:00"],
    ["jueves","08:00","17:00"],
]


dias_a_numeros = {
    "lunes": 0,
    "martes": 1,
    "miércoles": 2,
    "jueves": 3,
    "viernes": 4,
    "sábado": 5,
    "domingo": 6
}

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
"""


def analizar_dia_laboral(fecha):
    #aca analizo que dias tiene registrado el doctor
    for dia in basedatos:
        diasemana = dia[0]
        inicio = dia[1]
        fin = dia[2]

        if fecha.weekday() == dias_a_numeros[diasemana]:
            #logica que aplica los turnos desde el inicio hasta el fin
            print(diasemana, "con fecha", fecha)

def alta_de_turnos(fecha_inicio, fecha_fin):
    # Convertir las cadenas de entrada a objetos datetime, esto puede ser que lo pida desde front o que sea x dias en adelante
    fecha_inicio_obj = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fecha_fin_obj = datetime.strptime(fecha_fin, "%Y-%m-%d")

    fecha_revisar = fecha_inicio_obj
    while fecha_revisar <= fecha_fin_obj: 
        analizar_dia_laboral(fecha_revisar) #aca llamo a anlizar el dia para que registre el alta de turnos en la base de datos, lo hice asi porque me parece mas eficaz que pase 7 veces como maximo por la base de datos en l for de la funcion, a que haga este trabajo por cada fecha.
        fecha_revisar += timedelta(days=1)


alta_de_turnos("2024-07-28","2024-08-30")