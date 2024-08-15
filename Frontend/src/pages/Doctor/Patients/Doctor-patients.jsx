import { useEffect, useState } from "react";
import CardPatientList from "../../../components/Cards/CardPatientList";
import LateralView from "../../../components/LateralView";
import Icon from "../../../components/Icon/Icon";
import { getAllPatients } from "../../../services/patientService";

const DoctorPatients = () => {
  const [hasContent, setHasContent] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [value, setValue] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState();

  useEffect(() => {
    const loadPacientes = async () => {
      const data = await getAllPatients();
      const pacientesData = data.map((patient) => ({ patient }));
      setPacientes(pacientesData);
    };
    loadPacientes();
  }, []);
  useEffect(() => {
    const filtered = pacientes.filter((patient) =>
      patient.patient.user.first_name
        .toLowerCase()
        .includes(value.toLowerCase()),
    );
    setFilteredPatients(filtered);
  }, [pacientes, value]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setHasContent(e.target.value !== "");
  };
  return (
    <main>
      <h1 className="font-semibold text-3xl font-josefin">Pacientes</h1>
      <div className="flex items-center">
        {/**CUADRO DE BUSQUEDA */}
        <div className="relative px-2 w-[705px] h-[56px]">
          <div className="relative top-[38px] left-3 text-xl">
            <Icon name="search" />
          </div>
          <div
            className="absolute top-[38px] right-3 text-xl cursor-pointer"
            onClick={() => setValue("")}
          >
            <Icon name="IoMdCloseCircleOutlineIcon" />
          </div>
          <input
            id="busqueda"
            className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer ${
              hasContent ? "" : "border-gray-300"
            }`}
            placeholder=" "
            onChange={handleInputChange}
            onFocus={() => setHasContent(true)}
            onBlur={(e) => setHasContent(e.target.value !== "")}
            value={value}
          />
          <label
            htmlFor="busqueda"
            className={`absolute text-sm bg-white text-[#1D1B20] duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] left-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-5 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-1 ${
              hasContent ? "bg-white scale-100 -translate-y-0" : ""
            }`}
          >
            Nombre del paciente
          </label>
        </div>
      </div>
      <section className="flex gap-6">
        <ul className="gap-4 flex flex-col items-center w-2/3 mt-10 overflow-x-visible overflow-y-scroll h-[400px]">
          {/*Lista de pacientes */}
          {filteredPatients &&
            filteredPatients.map((paciente, index) => (
              <CardPatientList
                key={index}
                paciente={paciente}
                pacienteSeleccionado={pacienteSeleccionado}
                setPacienteSeleccionado={setPacienteSeleccionado}
              />
            ))}
        </ul>
        <LateralView paciente={pacienteSeleccionado} />
      </section>
    </main>
  );
};

export default DoctorPatients;
