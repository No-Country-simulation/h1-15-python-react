/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import Avatar from "./../Avatar";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { getPersonalInfoById } from "../../services/patientService";
const CardPatientAttendance = ({ paciente }) => {
  const [estado, setStado] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState();
  function controlState(paciente) {
    const cita = dayjs(paciente.appointmentDate);
    const actual = dayjs();
    if (actual.isAfter(cita)) {
      setStado(true);
    } else {
      setStado(false);
    }
  }
  useEffect(() => {
    getPersonalInfoById(paciente.id).then((res) => {
      setPacienteSeleccionado(res);
    });
  }, []);
  useEffect(() => {
    controlState(paciente);
  }, [paciente]);

  return (
    <div className="my-10 flex flex-col">
      <div className="bg-yellow-300 text-black rounded-3xl w-full py-4 text-sm px-2 text-center">
        Este paciente está diagnosticado con <i>Falta obtener el dato</i>.
        <br />
        Su nivel de riesgo es <b>Bajo</b>
      </div>
      {/* CONECTOR */}
      <div className="bg-yellow-300 w-full flex gap-10 h-5">
        <div className="bg-white w-1/2 h-5 rounded-r-xl"></div>
        <div className="bg-white w-1/2 h-5 rounded-l-xl"></div>
      </div>
      {/**FIN CONECTOR */}
      <div className="bg-yellow-300 rounded-3xl p-3 flex justify-center items-stretch flex-col">
        <div className="flex justify-around gap-4">
          <Avatar
            className={"w-[100px] h-auto rounded-full mt-0 self-center"}
            imagen={paciente?.user.url_photo}
          />
          <div className="flex flex-col">
            <div className={`flex gap-3 items-center font-bold `}>
              <div
                className={`${
                  estado ? "bg-green-500" : "bg-green-500"
                } rounded-full w-5 h-5`}
              ></div>
              {estado ? "En consulta" : "Agendado"}
            </div>
            <p className="text-xl">
              {paciente.user.first_name + " " + paciente.user.last_name}
            </p>
            <p className="font-light">
              Edad: <span>TRAER CALCULAR EDAD</span> años
            </p>
            <div className="w-full bg-slate-400 my-2"></div>
            <b>Médico a cargo:</b>
            <span className="font-light">
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}
            </span>
            <b>Especialidad:</b>
            <span className="font-light">debo traer especialidad</span>
          </div>
        </div>

        <div className="bg-red-500 rounded-3xl p-4 flex flex-col relative text-base min-h-36 mt-5 text-white">
          <p>
            Ultimo diagnóstico: <i>Arritmia</i>
          </p>
          <p>
            Visitas: <strong></strong>
          </p>
          <p className="w-36">
            Ultimo Reporte: <a href="">Aqui</a>
          </p>
          <Tooltip title="Proximamente...">
            <button className="bg-black hover:bg-slate-500 hover:text-black text-yellow-400 text-xs absolute bottom-3 right-3 p-3 rounded-3xl ">
              Detalles...
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CardPatientAttendance;
