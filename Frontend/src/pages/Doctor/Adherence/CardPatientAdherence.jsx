/* eslint-disable react/prop-types */
const CardPatientAdherence = ({ paciente }) => {
  const diagnostico = paciente.diagnostic || "Arritmia";
  const imagen = paciente.picture || undefined;
  const riesgo = paciente.risk || "Bajo";
  const nombre = paciente.name || "Jonah Makarov";
  const edad = paciente.age || "15";
  const doctor = paciente.headDoctor || "";
  const especialidad = paciente.especialist || "Cardiología";
  const visitas = paciente.visits || "10";
  const estado = paciente.estado || true; 

  return (
    <div className="my-10 flex flex-col w-[317px] max-w-[317px]">
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
      {/* FIN CONECTOR */}
      <div className="bg-yellow-300 rounded-3xl p-3 flex justify-center items-stretch flex-col">
        <div className="flex justify-around">
          <img
            className="w-23 h-24 rounded-full mt-0 self-center"
            src={imagen}
          />
          <div className="flex flex-col">
            <div className="flex gap-3 items-center font-bold">
              <div
                className={`${
                  estado ? "bg-green-500" : "bg-orange-500"
                } rounded-full w-5 h-5`}
              ></div>
              {estado ? "En consulta" : "Agendado"}
            </div>
            <p className="text-xl">{nombre}</p>
            <p className="font-light text-sm">
              Edad: <span>{edad}</span> años
            </p>
            <div className="w-full h-[1px] bg-slate-400 my-3"></div>
            <p>{doctor}</p>
            <p className="font-semibold text-sm">{especialidad}</p>
          </div>
        </div>

        <div className="bg-red-500 rounded-3xl p-4 flex flex-col relative text-base min-h-36 mt-5 text-white">
          <p>
            Último diagnóstico: <i>{diagnostico}</i>
          </p>
          <p>
            Visitas: <strong>{visitas}</strong>
          </p>
          <p className="w-36">
            Último Reporte: <a href="#">Aquí</a>
          </p>
          <button className="bg-black hover:bg-slate-500 hover:text-black text-yellow-400 text-xs absolute bottom-3 right-3 p-3 rounded-3xl">
            Detalles...
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPatientAdherence;
