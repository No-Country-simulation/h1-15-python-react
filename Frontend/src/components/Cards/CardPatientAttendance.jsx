/* eslint-disable react/prop-types */
import { Tooltip } from "@mui/material";
import { getHistorys } from "../../services/clinicHistory";
import { getDoctorData } from "../../services/doctorService";
import { getAllPatologys } from "../../services/patologysService";
import { getPersonal_Info } from "../../services/userServices";
import { calculateAge } from "../../utils/date";
import Avatar from "./../Avatar";
import { useEffect, useState } from "react";

const CardPatientAttendance = ({ paciente, enConsulta }) => {
  const [estado, setEstado] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [age, setAge] = useState();
  const [patologias, setPatologias] = useState([]);
  const [patologia, setPatologia] = useState(null);
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
        (history) => history?.patient === paciente.patient.id,
      );
      const findPatology = patologias?.find(
        (patologia) => patologia?.id === filterResults[0]?.pathology,
      );
      setPatologia(findPatology?.name);
    };
    historial();
  }, [paciente.patient.id, patologias]);
  useEffect(() => {
    const datosDoctor = async () => {
      const data = await getDoctorData();
      setDoctorData(data);
    };
    datosDoctor();
  }, [paciente]);
  useEffect(() => {
    if (enConsulta) {
      setEstado(true);
    }
  }, [enConsulta]);
  useEffect(() => {
    const getInfo = async () => {
      const data = await getPersonal_Info(paciente);
      setPatientInfo(data[0]);
      setAge(calculateAge(data[0].birth_date));
    };

    getInfo();
  }, [paciente]);

  return (
    <div className="my-10 flex flex-col">
      <div className="bg-yellow-300 text-black rounded-3xl w-full py-4 text-sm px-2 text-center">
        {patologia
          ? `Este paciente está diagnosticado con `
          : "Este paciente no cuenta con diagnósitco"}
        <i>{patologia}</i>
        <br />
        Su nivel de riesgo es <b>Bajo</b>
      </div>
      {/* CONECTOR */}
      <div className="bg-yellow-300 w-full flex gap-10 h-5">
        <div className="bg-white w-1/2 h-5 rounded-r-xl"></div>
        <div className="bg-white w-1/2 h-5 rounded-l-xl"></div>
      </div>
      {/**FIN CONECTOR */}
      <div className="bg-yellow-300 rounded-3xl p-3 flex justify-center items-stretch flex-col">
        <div className="flex justify-around gap-4">
          <Avatar
            className={"w-[60px] h-auto rounded-full mt-0 self-center"}
            imagen={paciente.patient.user?.url_photo}
          />
          <div className="flex flex-col">
            <div className={`flex gap-3 items-center font-bold `}>
              <div
                className={`${
                  estado ? "bg-green-500" : "bg-green-500"
                } rounded-full w-5 h-5`}
              ></div>
              <p className="text-center py-2">
                {estado || enConsulta ? "En consulta" : "Agendado"}
              </p>
            </div>
            <p className="text-xl">
              {paciente.patient.user.first_name +
                " " +
                paciente.patient.user.last_name}
            </p>
            <p className="font-light">
              Edad: <span>{age}</span> años
            </p>
            <div className="w-full bg-slate-400 my-2"></div>
            <b>Médico a cargo:</b>
            <span className="font-light">
              {localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")}
            </span>
            <b>Especialidad: </b>
            <span className="font-light"> {doctorData?.specialty}</span>
          </div>
        </div>

        <div className="bg-red-500 rounded-3xl p-4 flex flex-col relative text-base min-h-36 pb-20 mt-5 text-white">
          <p>
            Obra Social: <strong>{paciente.patient.financer}</strong>
          </p>
          <p>
            Tipo de Sangre: <strong>{patientInfo?.blood_type}</strong>
          </p>
          <p>
            Alergias:{" "}
            <strong>
              {paciente.medicalHistory
                ? paciente.medicalHistory.allergies
                : "Sin HC"}
            </strong>
          </p>
          <p>
            Condiciones:{" "}
            <strong>
              {paciente.medicalHistory
                ? paciente.medicalHistory.conditions
                : "Sin HC"}
            </strong>
          </p>
          <Tooltip title="Proximamente... ">
            <button className="bg-black hover:bg-slate-500 hover:text-black text-yellow-400 text-xs absolute bottom-3 right-3 p-3 rounded-3xl ">
              Abrir Historial Clínico...
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CardPatientAttendance;
