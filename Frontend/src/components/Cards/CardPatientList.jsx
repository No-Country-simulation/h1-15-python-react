/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";

const CardPatientList = ({
  paciente,
  pacienteSeleccionado,
  setPacienteSeleccionado,
}) => {
  const pacienteFake = {
    diagnostic: "Arritmia",
    picture: "/Perfil2.png",
    risk: "Medio",
    name: "Jonah Makarov",
    age: "15",
    headDoctor: "Porcel",
    especialist: "Cardiología",
    visits: "10",
  };
  return (
    <div className="bg-[#28ADE4] w-full h-[64px] rounded-[76px] text-white flex items-center px-6">
      <div className="ml-[37px] flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <Avatar />
          <div>
            <p className="font-medium text-sm">{paciente.name}</p>
            <p className="text-sm">{paciente.age}, Hipocardíaco</p>
          </div>
        </div>
        <div>Hospital Alemán</div>
        <button
          className="bg-white rounded-full px-2 py-2  hover:scale-110 transition-all duration-200"
          onClick={() => {
            if (!pacienteSeleccionado) {
              setPacienteSeleccionado(pacienteFake);
            } else {
              setPacienteSeleccionado(undefined);
            }
          }}
        >
          <FiArrowRight className="text-black text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CardPatientList;
