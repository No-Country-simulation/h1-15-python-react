import axios from "axios";
import { API_URL } from "./apiConfig";

export const getDoctorDataAll = async () => {
  try {
    console.log('Iniciando la solicitud para obtener los datos de los doctores...');
    const res = await axios.get(`${API_URL}/doctor/`);

    console.log('Solicitud exitosa. Procesando los datos...');
    const data = res.data;

    console.log('Datos obtenidos:', data);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos de los doctores:", error);
    throw error;
  }
};

export const getDoctorData = async () => {
  const localDoctorId = localStorage.getItem("doctorId");

  try {
    const res = await axios.get(`${API_URL}/doctor/${localDoctorId}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postDoctorUser = async (doctorData) => {
  const localUserId = localStorage.getItem("userId");
  doctorData.user = Number(localUserId);
  try {
    console.log(doctorData);
    const res = await axios.post(`${API_URL}/doctor/`, doctorData);
    const data = await res.data;
    localStorage.setItem("doctorId", data.id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postDoctorSchedule = async (newData) => {
  const localDoctorId = localStorage.getItem("doctorId");

  newData.doctor_id = localDoctorId;
  try {
    const res = await axios.post(`${API_URL}/availability/create/`, newData);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDoctorData = async (doctorData) => {
  const localDoctorId = localStorage.getItem("doctorId");
  const localUserId = localStorage.getItem("userId");
  doctorData.user = Number(localUserId);
  try {
    const res = await axios.put(
      `${API_URL}/doctor/${localDoctorId}`,
      doctorData,
    );
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const verifyUserDoctor = async () => {
  const localToken = localStorage.getItem("authToken");

  try {
    const response = await axios.get(`${API_URL}/doctor/verify_user/`, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });

    const { Doctor_id } = response.data;
    localStorage.setItem("doctorId", Doctor_id);

    return response.data;
  } catch (error) {
    console.error("Error al verificar el estado del medico:", error);
    throw error;
  }
};

export const getDoctorSchedule = async (doctorId, fecha) => {
  try {
    // Log para verificar los parámetros enviados
    console.log("Fetching schedule for doctor:", doctorId, "on date:", fecha);

    // Realiza la solicitud GET al endpoint actualizado
    const response = await axios.get(`${API_URL}/appointment/list/combo/`, {
      params: {
        doctor_id: doctorId,
        fecha: fecha,
        status: 'available',
      }
    });

    // Log para verificar la respuesta del servidor
    console.log("Doctor schedule fetched:", response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching doctor schedule:', error);
    throw error;
  }
};
