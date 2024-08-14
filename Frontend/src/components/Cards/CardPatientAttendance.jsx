/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import Avatar from "./../Avatar";
import { useEffect, useState } from "react";

const CardPatientAttendance = ({ paciente, doctorInfo, enConsulta }) => {
  const [estado, setStado] = useState(false);
  const diagnostico = paciente.diagnostic ? paciente.diagnostic : "Arritmia";
  const imagen = paciente.picture ? paciente.picture : undefined;
  const obraSocial = paciente.financer ? paciente.financer : "Particular";
  const riesgo = paciente.risk ? paciente.risk : "Alto";
  const nombre = paciente.name ? paciente.name : "Jonah Makarov";
  const sangre = paciente.bloodType ? paciente.bloodType : "A+";
  const edad = paciente.age ? paciente.age : "15";
  //const doctor = doctorInfo?.user ? doctorInfo.user : "";
  const condiciones = paciente.conditions ? paciente.conditions : "";
  const alergias = paciente.allergies ? paciente.allergies : "";
  const especialidad = doctorInfo?.specialty ? doctorInfo.specialty : "Clinico";
  const doctorName = JSON.stringify(
    localStorage.getItem("firstName") + " " + localStorage.getItem("lastName"),
  ).replace(/"/g, "");

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
    controlState(paciente);
  }, [paciente]);

  return (
    <div className="my-10 flex flex-col">
      <div className="bg-yellow-300 text-black rounded-3xl w-full py-4 text-sm px-2 text-center">
        Este paciente está diagnosticado con <i>{diagnostico}</i>.
        <br />
        Su nivel de riesgo es <b>{riesgo}</b>
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
            className={"w-[60px] h-auto rounded-full mt-0 self-center"}
            imagen={imagen}
          />
          <div className="flex flex-col">
            <div className={`flex gap-3 items-center font-bold `}>
              <div
                className={`${
                  estado ? "bg-green-500" : "bg-green-500"
                } rounded-full w-5 h-5`}
              ></div>
              <p className="text-center py-2">
                {estado || enConsulta ? "En consulta" : "Agendado"}
              </p>
            </div>
            <p className="text-xl">{nombre}</p>
            <p className="font-light">
              Edad: <span>{edad}</span> años
            </p>
            <div className="w-full bg-slate-400 my-2"></div>
            <b>Médico a cargo:</b>
            <span className="font-light">{doctorName}</span>
            <b>Especialidad:</b>
            <span className="font-light"> {especialidad}</span>
          </div>
        </div>

        <div className="bg-red-500 rounded-3xl p-4 flex flex-col relative text-base min-h-36 pb-20 mt-5 text-white">
          <p>
            Obra Social: <strong>{obraSocial}</strong>
          </p>
          <p>
            Tipo de Sangre: <strong>{sangre}</strong>
          </p>
          <p>
            Alergias: <strong>{alergias}</strong>
          </p>
          <p>
            Condiciones: <strong>{condiciones}</strong>
          </p>

          <button className="bg-black hover:bg-slate-500 hover:text-black text-yellow-400 text-xs absolute bottom-3 right-3 p-3 rounded-3xl ">
            Abrir Historial Clínico...
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPatientAttendance;
