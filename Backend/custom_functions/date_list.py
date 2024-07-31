from datetime import datetime, timedelta


datos_dias = [
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

def fecha_obj_a_str(fecha):
    fecha_trunc = datetime.date(fecha)
    return datetime.strftime(fecha_trunc, "%Y-%m-%d")

def analizar_dia_laboral(datos_dias, fecha, duracion):
    turnos_del_dia = []
    #aca analizo que dias tiene registrado el doctor
    for dia in datos_dias:
        diasemana = dia[0]
        inicio = dia[1]
        fin = dia[2]

        if fecha.weekday() == dias_a_numeros[diasemana]:
            #logica que aplica los turnos desde el inicio hasta el fin
            fecha_str = fecha_obj_a_str(fecha)
            inicio_obj = datetime.strptime(inicio, "%H:%M")
            fin_obj = datetime.strptime(fin, "%H:%M")
            inicio_turno = inicio_obj
            while inicio_turno < fin_obj:
                turno_str = str(datetime.time(inicio_turno))
                turnos_del_dia.append([fecha_str, turno_str])
                inicio_turno += timedelta(minutes=duracion)
    print(turnos_del_dia)

def validar_fechas(datos_dias, fecha_inicio, fecha_fin, duracion):
    # Convertir las cadenas de entrada a objetos datetime
    fecha_inicio_obj = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fecha_fin_obj = datetime.strptime(fecha_fin, "%Y-%m-%d")
    fecha_revisar = fecha_inicio_obj
    
    # Recorrer el rango de fechas, y agregar turnos por día
    while fecha_revisar <= fecha_fin_obj: 
        analizar_dia_laboral(datos_dias, fecha_revisar, duracion)
        fecha_revisar += timedelta(days=1)


validar_fechas(datos_dias, "2024-07-28","2024-08-10", 15)

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
