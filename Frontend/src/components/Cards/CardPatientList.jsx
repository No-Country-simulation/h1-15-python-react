/* eslint-disable react/prop-types */
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const CardPatientList = ({
  paciente,
  pacienteSeleccionado,
  setPacienteSeleccionado,
}) => {
  return (
    <div className="bg-[#28ADE4] w-full h-[64px] rounded-[76px] text-white flex items-center px-6">
      <div className="ml-[37px] flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <img
            src={paciente.picture}
            alt={paciente.name}
            className="w-10 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{paciente.name}</p>
            <p className="text-sm">{paciente.age}, Hipocardíaco</p>
          </div>
        </div>
        <div>Hospital Alemán</div>
        <button
          className="bg-white rounded-full px-2 py-2 hover:scale-110 transition-all duration-200"
          onClick={() => {
            if (!pacienteSeleccionado) {
              setPacienteSeleccionado(paciente);
            } else {
              setPacienteSeleccionado(undefined);
            }
          }}
        >
          {pacienteSeleccionado === paciente ? (
            <FiArrowLeft className="text-black text-lg" />
          ) : (
            <FiArrowRight className="text-black text-lg" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CardPatientList;
