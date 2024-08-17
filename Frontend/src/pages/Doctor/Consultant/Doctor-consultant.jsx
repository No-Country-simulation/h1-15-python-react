"use client";
import { useLocation, useNavigate } from "react-router-dom";
import LateralView from "../../../components/LateralView";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import VoiceDictation from "../../../components/VoiceDictation/VoiceDictation";
import { getTodayAppointmentData } from "../../../services/appointments";
import { getAllPatologys } from "../../../services/patologysService";
import { getDoctorData } from "../../../services/doctorService";
// import { sendTreatment } from "../../../services/treatmentsService";
import { getHistorys } from "../../../services/clinicHistory";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../../utils/toast";

const DoctorConsultant = () => {
  const url = useLocation();
  const id = url.pathname?.split("/")[3];
  const [consulta, setConsulta] = useState();
  const [patologias, setPatologias] = useState();
  const [dictado, setDictado] = useState("");
  const [formData, setFormData] = useState({
    attention_observations: "",
  });
  const [enableSend, setEnabledSend] = useState(false);
  const [doctorData, setDoctorData] = useState(null);

  const navigation = useNavigate();
  useEffect(() => {
    const datosDoctor = async () => {
      const data = await getDoctorData();
      setDoctorData(data);
    };
    datosDoctor();
  }, []);

  const handleDictate = (text) => {
    setDictado(text);
  };

  useEffect(() => {
    const consult = async () => {
      const consultas = await getTodayAppointmentData();
      const patientConsult = consultas.filter(
        (consulta) => consulta?.id === parseInt(id),
      );
      setConsulta(patientConsult[0]);
    };
    consult();
  }, []);
  useEffect(() => {
    setFormData({
      ...formData,
      patient: consulta?.patient.id,
      entity: consulta?.entity.name,
      reason_for_visit: consulta?.reason_for_visit,
      appointment_id: consulta?.id,
    });
  }, [consulta]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "observations") {
      setEnabledSend(value.trim() !== "" || dictado.trim() !== "");
    }
  };

  useEffect(() => {
    if (dictado) {
      setFormData((prevData) => ({
        ...prevData,
        observations: dictado,
      }));
      setEnabledSend(dictado.trim() !== "");
    }
  }, [dictado]);

  useEffect(() => {
    const pato = async () => {
      const patologies = await getAllPatologys();
      const patologiesFiltered = patologies?.filter(
        (patologia) => patologia?.specialty === doctorData?.specialty,
      );
      setPatologias(patologiesFiltered);
    };
    pato();
  }, [doctorData?.specialty]);
  useEffect(() => {
    const historial = async () => {
      const result = await getHistorys();
      const filterResults = result?.filter(
        (history) => history?.patient === consulta?.patient.id,
      );
      const findPatology = patologias?.find(
        (patologia) => patologia?.id === filterResults[0]?.pathology,
      );
      setFormData({
        ...formData,
        pathology: filterResults[0] ? findPatology?.name : "",
      });
    };
    historial();
  }, [patologias]);
  {
    /**DEBE ENVIAR A LA API DE HISTORIA CLINICA */
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("datos previos al envío de la data", formData);

  //   sendTreatment(formData).then((data) => {
  //     if (data?.status == 201) {
  //       showToast(
  //         "Consulta terminada. Datos enviados correctamente",
  //         "success",
  //       );
  //       setTimeout(() => {
  //         navigation("/doctor");
  //       }, 3000);
  //     } else {
  //       showToast("Error de conexión. Datos no enviados", "error");
  //     }
  //   });
  // };

  const handleSubmit = () => {
    // Muestra el toast de éxito
    showToast("Consulta terminada. Redirigiendo a adherencia...", "success");

    // Redirige a /doctor/adherence después de 3 segundos
    setTimeout(() => {
      navigation("/doctor/adherence");
    }, 2000);
  };

  return (
    <main className="grid grid-cols-[3fr_1fr]">
      <form
        className="w-full flex flex-col gap-5 pr-10"
        onSubmit={handleSubmit}
      >
        <h3 className="text-4xl -translate-y-5">Nueva Consulta</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div className="flex justify-between bg-slate-200 p-2 rounded-md">
            <div
              id="place"
              name="place"
              className="bg-slate-200 outline-none flex justify-between w-full"
            >
              <p>Lugar de consulta: </p> <p>{consulta?.entity.name}</p>
            </div>
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
            <p>Razón de la consulta</p>
            <p
              name="Consultant_motive"
              className="bg-slate-200 p-2 rounded-md h-16"
            >
              {consulta?.reason_for_visit}
            </p>
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="observations">Observaciones</label>
            <div className="flex justify-between">
              <textarea
                name="observations"
                value={formData?.observations}
                onChange={handleInputChange}
                className="bg-slate-200 p-2 rounded-md w-[90%]"
              ></textarea>
              <div className="self-center">
                <VoiceDictation onDictate={handleDictate} />
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-slate-200 p-2 col-span-2 rounded-md">
            <label htmlFor="diagnostic">Diagnóstico: </label>
            <select
              className="bg-slate-200 outline-none"
              id="pathology"
              name="pathology"
              value={formData?.pathology || "0"}
              onChange={handleInputChange}
            >
              <option value="0"></option>
              {patologias?.map((patologia) => (
                <option
                  className="w-[90%] py-4"
                  key={patologia.id}
                  value={patologia.name}
                >
                  {patologia.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-5">
            <button className="px-2 py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 hover:shadow-lg active:shadow-inner">
              Agregar tratamiento
            </button>
            <button className="px-2 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500 hover:shadow-lg active:shadow-inner">
              Agregar medicación
            </button>
          </div>
          <div className="self-center">
            {/* <button
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg active:shadow-inner disabled:bg-gray-400 disabled:text-black"
              disabled={!enableSend}
            >
              Guardar
            </button> */}
            <button
              type="button" // Cambia el tipo a "button" para que no se envíe el formulario automáticamente
              onClick={handleSubmit} // Añade el manejador para redirigir
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:shadow-lg active:shadow-inner disabled:bg-gray-400 disabled:text-black"
              disabled={!enableSend}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
      <LateralView
        paciente={consulta}
        enConsulta={true}
        HC={formData?.pathology}
      />

      <ToastContainer />
    </main>
  );
};

export default DoctorConsultant;
