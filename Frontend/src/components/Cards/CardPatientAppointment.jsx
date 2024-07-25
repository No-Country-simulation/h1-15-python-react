import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const CardPatientAppointment = ({
  paciente,
  clickear,
  pacienteSeleccionado,
}) => {
  const [seleccionado, setSeleccionado] = useState("bg-white");
  const imagen = paciente.picture;
  const nombre = paciente.name;
  const hora = new Date(paciente.appointmentDate)
    .toTimeString()
    .toString()
    .slice(0, 5);

  useEffect(() => {
    if (pacienteSeleccionado) {
      if (pacienteSeleccionado._id === paciente._id) {
        setSeleccionado("bg-blue-200");
      } else {
        setSeleccionado("bg-white");
      }
    }
  }, [pacienteSeleccionado]);

  return (
    <div
      className={`${seleccionado} group flex justify-around w-full h-20 border-blue-500 border shadow-md hover:bg-blue-300 transition-colors duration-300 shadow-blue-200 text-black rounded-xl items-center my-5`}
      onClick={() => clickear(paciente)}
    >
      <img
        className=" transition-colors duration-300 rounded-full w-14 h-14"
        src={imagen}
        alt="avatar"
      />
      <p className="text-lg ">{nombre}</p>
      <p className="text-lg ">{hora} hs.</p>
    </div>
  );
};

export default CardPatientAppointment;
