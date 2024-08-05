import { useEffect, useState } from "react";
import medicina from "../../../data/medicine.json";
import pacientes from "../../../data/pacientes.json";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";
import { useDropzone } from "react-dropzone";
import { showToast } from "../../../utils/toast";
import { ToastContainer } from "react-toastify";

const DoctorTreatments = () => {
  const [data, setData] = useState({
    paciente: "",
    medicamento: "0",
    dosis: "0",
    frecuencia: "0",
    duracion: "0",
    desde: "",
    comentario: "",
    archivo: "",
  });
  const [error, setError] = useState({
    paciente: false,
  });
  const [dosis, setDosis] = useState();
  const frecuencia = [
    "1 Hora",
    "2 Hs",
    "3 Hs",
    "4 Hs",
    "6 Hs",
    "8 Hs",
    "12 Hs",
    "Diario",
    "Interdiario",
    "Semanal",
    "Mensual",
    "Bimestral",
    "Trimestral",
    "Semestral",
    "Anual",
  ];
  const duracion = [
    "Único",
    "1 semana",
    "2 semanas",
    "3 semanas",
    "1 mes",
    "2 meses",
    "3 meses",
    "4 meses",
    "1 año",
    "2 años",
    "3 años",
    "Vitalicio",
  ];

  const handleInputChange = (e) => {
    setData({ ...data, paciente: e.target.value });
    setError({ ...error, paciente: false });
  };

  const handleMedicineSelect = (e) => {
    setData({ ...data, medicamento: e.target.value });
    setDosis(medicina.medicamentos[e.target.value]);
  };
  const handleDosisSelect = (e) => {
    setData({ ...data, dosis: e.target.value });
  };
  const handleFrecuenciaSelect = (e) => {
    setData({ ...data, frecuencia: e.target.value });
  };
  const handleDuracionSelect = (e) => {
    setData({ ...data, duracion: e.target.value });
  };
  const handleDesdeSelect = (e) => {
    setData({ ...data, desde: e.$d });
  };
  const handleComentariosChange = (e) => {
    setData({ ...data, comentario: e.target.value });
  };
  const handleDictate = (text) => {
    setData({ ...data, comentario: text });
  };
  const { getRootProps, getInputProps } = useDropzone({
    // Note how this callback is never invoked if drop occurs on the inner dropzone
    onDrop: (files) => setData({ ...data, archivo: files[0].name }),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.paciente === "") {
      setError({ ...error, paciente: true });
    } else {
      showToast("Tratamiento asignado correctamente", "success");
    }
  };
  /* const getPacientes = async () => {
    const response = await fetch(
      "https://justinaback.pythonanywhere.com/api/patient/",
    );
    const data = await response.json();
    console.log(data);
  }; */

  useEffect(() => {
    setDosis(medicina.medicamentos[data.medicamento]);
    // getPacientes();
  }, [data]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="w-2/3 flex flex-col items-center">
        <ToastContainer />
        <h1 className="font-semibold text-[64px] font-josefin">Tratamientos</h1>
        <section>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <h3 className="font-medium text-2xl font-josefin mt-6">
              Seleccionar tratamiento para el paciente
            </h3>
            {/**BUSQUEDA DE NOMBRE */}
            <div className="relative px-2 py-2 w-[507px] h-[56px]">
              <datalist id="pacientes">
                {pacientes.result.map((paciente, index) => (
                  <option key={index} value={paciente.name} />
                ))}
              </datalist>
              <input
                id="busqueda"
                list="pacientes"
                className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer`}
                value={data.paciente}
                onChange={handleInputChange}
              />
              <label
                htmlFor="busqueda"
                className={`absolute px-1 text-sm bg-white text-[#1D1B20] duration-300 transform scale-100 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-3 ${
                  data.paciente !== "" ? "-translate-y-16" : "-translate-y-10"
                }`}
              >
                Nombre del paciente
              </label>
              {error.paciente && (
                <p className="text-end text-red-700 text-sm">
                  Debe ingresar un nombre de paciente
                </p>
              )}
            </div>
            {/**MEDICAMENTO */}
            <div className="relative px-2 py-2 w-[507px] h-[56px] z-10">
              <select
                id="medicamentos"
                className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer `}
                value={data.medicamento}
                onChange={handleMedicineSelect}
              >
                {medicina &&
                  medicina.medicamentos.map((medicamento, index) => (
                    <option key={index} value={index}>
                      {medicamento.medicamento}
                    </option>
                  ))}
              </select>
              <label
                htmlFor="medicamentos"
                className={`absolute px-1 text-sm bg-white text-[#1D1B20] duration-300 transform scale-100 z-10 origin-[0] left-6 -translate-y-16`}
              >
                Medicamentos
              </label>
            </div>
            {/**DOSIS */}
            <div className="relative px-2 py-2 w-[507px] h-[56px]">
              <select
                id="dosis"
                className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer `}
                value={data.dosis}
                onChange={handleDosisSelect}
              >
                {dosis &&
                  dosis.dosis.map((elemento, index) => (
                    <option key={index} value={index}>
                      {elemento}
                    </option>
                  ))}
              </select>
              <label
                htmlFor="dosis"
                className={`absolute px-1 text-sm bg-white text-[#1D1B20] duration-300 transform scale-100 z-10 origin-[0] left-6 -translate-y-16`}
              >
                Dosis
              </label>
            </div>
            {/*FRECUENCIA*/}
            <div className="relative px-2 py-2 w-[507px] h-[56px]">
              <select
                id="frecuencia"
                className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer`}
                value={data.frecuencia}
                onChange={handleFrecuenciaSelect}
              >
                {frecuencia.map((elemento, index) => (
                  <option key={index} value={index}>
                    {elemento}
                  </option>
                ))}
              </select>
              <label
                htmlFor="frecuencia"
                className={`absolute px-1 text-sm bg-white text-[#1D1B20] duration-300 transform scale-100 z-10 origin-[0] left-6 -translate-y-16`}
              >
                Frecuencia
              </label>
            </div>
            {/**DURACION DEL TRATAMIENTO */}
            <div className="relative px-2 py-2 w-[507px] h-[56px]">
              <select
                id="duracion"
                className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer `}
                value={data.duracion}
                onChange={handleDuracionSelect}
              >
                {duracion.map((elemento, index) => (
                  <option key={index} value={index}>
                    {elemento}
                  </option>
                ))}
              </select>
              <label
                htmlFor="duracion"
                className={`absolute px-1 text-sm bg-white text-[#1D1B20] duration-300 transform scale-100 z-10 origin-[0] left-6 -translate-y-16`}
              >
                Duración del tratamiento
              </label>
            </div>
            <div className="relative px-2 py-2 w-[507px] flex items-center">
              Desde:
              <DateCalendar
                value={dayjs()}
                onChange={handleDesdeSelect}
                disablePast
              />
            </div>
            <div className="relative px-2 py-2 w-[507px] h-[56px]">
              <textarea
                id="comentario"
                name="comentario"
                value={data.comentario}
                onChange={handleComentariosChange}
                className={`block w-full h-[56px] px-6 py-4 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer `}
                rows="4"
                placeholder="Ingrese comentario por voz o texto."
              />
              <VoiceDictation onDictate={handleDictate} />
              <label
                htmlFor="comentario"
                className={`absolute px-1 text-sm bg-white text-[#1D1B20] duration-300 transform scale-100 z-10 origin-[0] left-6 -translate-y-16`}
              >
                Comentario
              </label>
            </div>
            {/**ARCHIVO */}
            <div
              {...getRootProps({ className: "dropzone" })}
              className="relative  ml-2 px-2 py-2 w-[486px] align-middle h-[84px] bg-[#E4E4E4] rounded-xl"
            >
              <input
                {...getInputProps()}
                id="archivo"
                type="file"
                accept="image/*"
                className={`block w-full h-[56px] px-10 text-sm bg-transparent rounded border border-[#79747E] appearance-none focus:outline-none peer`}
              />
              <p
                className={`text-center mt-4 px-1 text-sm bg-[#E4E4E4] text-[#1D1B20]`}
              >
                su archivo aquí o{" "}
                <span className="text-blue-500 cursor-pointer">
                  BUSQUE EN LA PC
                </span>
                <p className="text-sm">Maximo 10 MB</p>
              </p>
            </div>
            <button className="px-2 py-3 rounded-lg bg-blue-300 text-white font-josefin w-fit ml-52 hover:bg-blue-400">
              Crear tratamiento
            </button>
          </form>
        </section>
        <ToastContainer />
      </main>
    </LocalizationProvider>
  );
};

export default DoctorTreatments;
