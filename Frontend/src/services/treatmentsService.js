import axios from "axios";
import { API_URL } from "./apiConfig";
import { formatDate } from "../utils/date";

export const sendTreatment = async (datos) => {
  console.log("datos que recibe sendTreatment", datos);

  const authToken = localStorage.getItem("authToken");
  const body = {
    patient: datos.patient?.toString(),
    entity: datos.entity,
    date_of_attention: formatDate(new Date()),
    pathology: datos.pathology,
    medical_studies: "",
    attention_observations: datos.observations,
    treatment: "Ejercicios matutinos",
    start_datetime: formatDate(new Date()) + " 18:00:00",
    treat_duration: "60",
    treat_frecuency: "24",
    appointment_id: datos.appointment_id,
  };

  const config = {
    Authorization: "Bearer " + authToken,
  };
  try {
    const response = await axios.post(`${API_URL}treat_adherence/`, body, {
      headers: config,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
