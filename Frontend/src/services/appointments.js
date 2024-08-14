import axios from "axios";
import { API_URL } from "./apiConfig";

export const getTodayAppointmentData = async (day) => {
  const date = day ? day : new Date();
  const doctor = localStorage.getItem("doctorId");
  const dateFormated = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getDate()}&doctor_id=${doctor}`;
  try {
    const res = await axios.get(
      `${API_URL}/appointment/list/?fecha=${dateFormated}`,
    );
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos de las citas:", error);
  }
};
