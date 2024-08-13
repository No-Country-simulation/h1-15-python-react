import axios from "axios";
import { API_URL } from "./apiConfig";

export const activatePatient = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/patient/`, data);
    return response.data;
  } catch (error) {
    console.error("Error al activar el paciente:", error.message);
    if (error.response) {
      console.error("Respuesta del error:", error.response.data);
      console.error("Código de estado del error:", error.response.status);
    } else {
      console.error("Error sin respuesta:", error.message);
    }
    throw error;
  }
};

export const createPatientProfile = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/personal_info/`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el perfil del paciente:", error.message);
    if (error.response) {
      console.error("Respuesta del error:", error.response.data);
      console.error("Código de estado del error:", error.response.status);
    } else {
      console.error("Error sin respuesta:", error.message);
    }
    throw error;
  }
};

export const getPatientProfile = async () => {
  const authToken = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`${API_URL}/personal_info/my/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    }

    throw new Error("No se encontraron perfiles de paciente.");
  } catch (error) {
    console.error("Error al obtener el perfil del paciente:", error.message);
    if (error.response) {
      console.error("Respuesta del error:", error.response.data);
      console.error("Código de estado del error:", error.response.status);
    } else {
      console.error("Error sin respuesta:", error.message);
    }
    throw error;
  }
};


export const verifyUserStatus = async (authToken) => {
  try {
    const response = await axios.get(`${API_URL}/patient/verify_user/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const { patient_id } = response.data;
    localStorage.setItem("patient_id", patient_id);

    return response.data;
  } catch (error) {
    console.error("Error al verificar el estado del paciente:", error);
    throw error;
  }
};