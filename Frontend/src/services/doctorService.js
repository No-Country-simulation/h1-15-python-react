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
    console.error('Error al obtener los datos de los doctores:', error);
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

export const postDoctorSchema = async (newData) => {
  const localDoctorId = localStorage.getItem("doctorId");

  newData.doctor_id = localDoctorId;
  try {
    const res = await axios.post(`${API_URL}/availabilit/create/`, newData);
    const data = await res.data;
    console.log(data);

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
