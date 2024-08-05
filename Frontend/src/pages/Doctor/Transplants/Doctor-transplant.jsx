import { useState } from "react";

import LateralView from "../../../components/LateralView";
import { useEffect } from "react";
import { Switch, Tooltip } from "@mui/material";

const DoctorTransplants = () => {
  const [donantes, setDonantes] = useState();
  const [intercambiar, setIntercambiar] = useState(false);
  const [pacientes, setPacientes] = useState();
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState();
  async function loadPacientes() {
    const response = await fetch(
      "https://raw.githubusercontent.com/No-Country-simulation/h1-15-python-react/frontend-stable/Frontend/src/data/pacientes.json",
    );
    const names = await response.json();
    setPacientes(names.result);
  }
  async function loadDonantes() {
    const response = await fetch(
      "https://raw.githubusercontent.com/No-Country-simulation/h1-15-python-react/77130797313cdfcc6a228211aeec88e0bb7921ce/Frontend/src/data/donantes.json",
    );
    const names = await response.json();

    setDonantes(names.donantes);
  }
  useEffect(() => {
    loadPacientes();
    loadDonantes();
  }, []);

  console.log(pacientes);

  return (
    <main className="flex w-full max-h-[1024px]  gap-5">
      <section className="min-w-[689px] grid mx-auto h-fit relative font-josefin">
        <h1 className="font-josefin text-3xl text-center">
          TRANSPLANTES CRUZADOS
        </h1>
        <div className="grid grid-cols-[1fr_2px_1fr] gap-x-4 mt-6">
          <div className="text-center">
            <h2 className="text-xl my-4">Donantes</h2>

            <div className="h-[70%] overflow-y-scroll">
              {donantes &&
                donantes.map((donante, index) => (
                  <article
                    key={index}
                    className="flex gap-2 items-center justify-around my-4 cursor-pointer hover:bg-blue-100/55 px-4 py-1 rounded-lg shadow-[0px_4px_4px_0px_#00000040]"
                  >
                    <img
                      src={donante.picture}
                      alt={donante.nombre}
                      className="w-10 h-10 m-0 rounded-full"
                    />
                    <div className="flex flex-col text-left flex-grow">
                      <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {donante.nombre}
                      </p>
                      <div>
                        <p>
                          {donante.edad} años - <span>{donante.grupo}</span>
                        </p>
                      </div>
                    </div>
                    <Tooltip title="Proximamente">
                      <button className="font-sans py-2 px-6 text-xs rounded-[100px] font-medium bg-[#FFF693] shadow-[0px_4px_4px_0px_#00000040] text-[#CA9600] hover:text-black hover:font-semibold">
                        Ver Detalle...
                      </button>
                    </Tooltip>
                  </article>
                ))}
            </div>
          </div>
          <div className="w-1 border-l border-black "></div>
          <div className="text-center">
            <div className="flex justify-around gap-4 items-center">
              <h2 className="text-xl my-4">
                {intercambiar ? "Afines" : "Mis pacientes"}
              </h2>
              <Tooltip title={intercambiar ? "Mis pacientes" : "Afines"}>
                <Switch
                  checked={intercambiar}
                  onClick={() => setIntercambiar(!intercambiar)}
                />
              </Tooltip>
            </div>
            <div className="h-[70%] overflow-y-scroll">
              {pacientes &&
                pacientes.map((paciente, index) => {
                  return (
                    <article
                      key={index}
                      className={`flex gap-2 items-center justify-around my-4 cursor-pointer hover:bg-blue-100/55 px-4 py-1 rounded-lg shadow-[0px_4px_4px_0px_#00000040] ${pacienteSeleccionado && pacienteSeleccionado._id === paciente._id ? "bg-yellow-100" : ""}`}
                    >
                      <img
                        src={paciente.picture}
                        alt={paciente.nombre}
                        className="w-10 h-10 m-0 rounded-full"
                      />
                      <div className="flex flex-col text-left flex-grow">
                        <p>{paciente.name}</p>
                        <div>
                          <p>
                            {paciente.age} años - <span>A +</span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setPacienteSeleccionado(paciente);
                        }}
                        className="font-sans py-2 px-6 text-xs rounded-[100px] font-medium bg-[#FFF693] shadow-[0px_4px_4px_0px_#00000040] text-[#CA9600] hover:text-black hover:font-semibold"
                      >
                        Ver afin...
                      </button>
                    </article>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <LateralView paciente={pacienteSeleccionado} />
    </main>
  );
};

export default DoctorTransplants;
