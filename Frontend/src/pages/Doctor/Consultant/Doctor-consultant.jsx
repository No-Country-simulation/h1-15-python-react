"use client";
import { useLocation } from "react-router-dom";
import LateralView from "../../../components/LateralView";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";

const DoctorConsultant = () => {
  const url = useLocation();
  const id = url.pathname?.split("/")[3];

  const [paciente, setPaciente] = useState({});
  const [dictado, setDictado] = useState("");
  const [formData, setFormData] = useState({});

  const handleDictate = (text) => {
    setDictado(text);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "observation") {
      setFormData({
        ...formData,
        [name]: dictado,
      });
    }
  };

  {
    /**DEBE ENVIAR A LA API DE HISTORIA CLINICA */
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  {
    /**HAY QUE OBTENER PACIENTE, DATOS PERSONALES E HISTORIA CLINICA  */
  }
  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const response = await fetch(
          `https://justinaback.pythonanywhere.com/api/patient/${id}/`,
        );
        const data = await response.json();
        setPaciente(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (id) {
      fetchPaciente();
    }
  }, [id]);

  return (
    <main className="flex font-josefin">
      <form
        className="w-full flex flex-col gap-5 pr-10"
        onSubmit={handleSubmit}
      >
        <h3 className="text-4xl -translate-y-5">Nueva Consulta</h3>
        <h4 className="text-2xl text-center">
          {paciente?.user?.first_name} {paciente?.user?.last_name}
        </h4>
        <div className="grid grid-cols-2 gap-x-12 gap-y-5">
          <div className="flex justify-between bg-slate-200 p-2 rounded-md">
            <label htmlFor="consultant_type">Tipo de consulta: </label>
            <select
              className="bg-slate-200 outline-none"
              id="consultant_type"
              name="consultant_type"
              value={0}
              onChange={handleInputChange}
            >
              <option value={0}>Consulta Clinica</option>
            </select>
          </div>
          <div className="flex justify-between bg-slate-200 p-2 rounded-md">
            <label htmlFor="place">Lugar de consulta: </label>
            <select
              id="place"
              name="place"
              value={0}
              className="bg-slate-200 outline-none"
              onChange={handleInputChange}
            >
              <option value={0}>Hospital Italiano</option>
            </select>
          </div>
          <div className="flex justify-between bg-slate-200 p-2 rounded-md">
            <p>Horario de inicio de la consulta:</p>
            <p> {format(new Date(), "HH:mm")} Hs.</p>
          </div>
          <div className="flex justify-between bg-slate-200 p-2 rounded-md">
            <p>Dia de la consulta: </p>
            <p> {format(new Date(), "dd/MM/yyyy")}</p>
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="Consultant_motive">Razón de la consulta</label>
            <p
              name="Consultant_motive"
              className="bg-slate-200 p-2 rounded-md h-16"
            ></p>
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="Observations">Observaciones</label>
            <div className="flex justify-between">
              <textarea
                name="Observations"
                value={dictado}
                className="bg-slate-200 p-2 rounded-md w-[90%]"
              ></textarea>
              <VoiceDictation onDictate={handleDictate} />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <button className="px-2 py-1 bg-pink-500 text-white rounded-lg">
              Agregar tratamiento
            </button>
            <button className="px-2 py-1 bg-blue-400 text-white rounded-lg">
              Agregar medicación
            </button>
          </div>
          <div className="self-center">
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg">
              Guardar
            </button>
          </div>
        </div>
      </form>
      <LateralView paciente={paciente} />
    </main>
  );
};

export default DoctorConsultant;
