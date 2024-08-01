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
    
    #aca analizo que dias tiene registrado el doctor
    for dia in datos_dias:
        diasemana = dia[0]
        inicio = dia[1]
        fin = dia[2]

        if fecha.weekday() == dias_a_numeros[diasemana]:
            turnos_del_dia = []
            #logica que aplica los turnos desde el inicio hasta el fin
            fecha_str = fecha_obj_a_str(fecha)
            inicio_obj = datetime.strptime(inicio, "%H:%M")
            fin_obj = datetime.strptime(fin, "%H:%M")
            inicio_turno = inicio_obj
            while inicio_turno < fin_obj:
                turno_str = str(datetime.time(inicio_turno))
                turnos_del_dia.append([fecha_str, turno_str])
                inicio_turno += timedelta(minutes=duracion)
                
            return turnos_del_dia
    return "vacio"

def validar_fechas(datos_dias, fecha_inicio, fecha_fin, duracion):
    
    # Convertir las cadenas de entrada a objetos datetime
    fecha_inicio_obj = datetime.strptime(fecha_inicio, "%Y-%m-%d")
    fecha_fin_obj = datetime.strptime(fecha_fin, "%Y-%m-%d")
    fecha_revisar = fecha_inicio_obj
    
    lista_turnos = []
    
    # Recorrer el rango de fechas, y agregar turnos por día
    while fecha_revisar <= fecha_fin_obj: 
        turnos_dia = analizar_dia_laboral(datos_dias, fecha_revisar, duracion)
        if turnos_dia != "vacio":
            lista_turnos.append(turnos_dia)
        fecha_revisar += timedelta(days=1)
    
    return lista_turnos

def obtener_fecha_actual_str():
    hoy = datetime.now().date()
    return str(hoy)

def generar_fecha_fin_str(cantidad_dias):
    hoy = datetime.now()
    fin = hoy + timedelta(days=cantidad_dias)
    fecha_fin = fin.date()
    return str(fecha_fin)

print(validar_fechas(datos_dias, "2024-07-28","2024-08-10", 15))
#print(obtener_fecha_actual_str())
#print(generar_fecha_fin_str(60))