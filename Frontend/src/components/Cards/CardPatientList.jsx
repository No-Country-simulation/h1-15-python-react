import { Avatar, Checkbox } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";

const CardPatientList = (paciente, setPacienteSeleccionado) => {
  return (
    <div className="bg-[#28ADE4] w-full h-[64px] rounded-[76px] text-white flex items-center px-6">
      <Checkbox color="success" />
      <div className="ml-[37px] flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <Avatar />
          <div>
            <p className="font-medium text-sm">Joaquin Perez</p>
            <p className="text-sm">46, Hipocardíaco</p>
          </div>
        </div>
        <div>Hospital Alemán</div>
        <button
          className="bg-white rounded-full px-2 py-2"
          onClick={() => {
            setPacienteSeleccionado(paciente);
          }}
        >
          <FiArrowRight className="text-black text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CardPatientList;
