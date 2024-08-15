/* eslint-disable react/prop-types */
import Icon from "../Icon/Icon";

const CardPatientList = ({
  paciente,
  pacienteSeleccionado,
  setPacienteSeleccionado,
}) => {
  return (
    <div
      className="bg-[#28ADE4] w-[95%] h-[75px] rounded-[76px] text-white flex items-center py-2 px-6 hover:cursor-pointer hover:shadow-xl hover:scale-[101%] transition-all duration-200"
      onClick={() => {
        if (!pacienteSeleccionado) {
          setPacienteSeleccionado(paciente);
        } else {
          setPacienteSeleccionado(undefined);
        }
      }}
    >
      <div className="ml-[37px] flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <img
            src={paciente?.patient.user.url_photo}
            alt={paciente?.patient.user.first_name}
            className="w-10 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">
              {paciente?.patient.user.first_name +
                " " +
                paciente?.patient.user.last_name}
            </p>
            <p className="text-sm">
              {paciente.patient.age ? paciente.patient.age : "20 años"},
              Hipocardíaco
            </p>
          </div>
        </div>
        <div>Hospital Alemán</div>
        <button className="bg-white rounded-full px-2 py-2 hover:scale-110 transition-all duration-200 text-[#0009]">
          {pacienteSeleccionado?.patient.id === paciente?.patient.id ? (
            <Icon name="FiArrowLeft" />
          ) : (
            <Icon name="FiArrowRight" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CardPatientList;
