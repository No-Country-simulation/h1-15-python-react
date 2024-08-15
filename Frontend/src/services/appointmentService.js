import axios from "axios";
import { API_URL } from "./apiConfig";

export const updateAppointment = async (id, data) => {
  try {
    const token = localStorage.getItem("authToken");

    // Verifica si el token está disponible
    if (!token) {
      throw new Error("Token de autenticación no disponible.");
    }

    // Configura los headers para incluir el token de autenticación
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };

    console.log("Actualizando cita con ID:", id);
    console.log("Datos enviados para actualizar la cita:", data);

    // Realiza la solicitud PATCH para actualizar la cita con los headers configurados
    const response = await axios.patch(`${API_URL}/appointment/${id}`, data, config);

    console.log("Respuesta del servidor al actualizar la cita:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error actualizando la cita:", error.response ? error.response.data : error.message);
    throw error;
  }
};
