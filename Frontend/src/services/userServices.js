import axios from "axios";
import { API_URL } from "./apiConfig";

export const getUserData = async () => {
  const localUserId = localStorage.getItem("userId");

  try {
    const res = await axios.get(`${API_URL}/users/${localUserId}`);

    const data = res.data;

    // Guarda el nombre y apellido en el local storage con las claves 'firstName' y 'lastName'
    if (data.first_name && data.last_name) {
      localStorage.setItem("firstName", data.first_name);
      localStorage.setItem("lastName", data.last_name);
    }

    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Actualizar la foto de perfil del usuario
export const updateProfilePicture = async (urlPhoto) => {
  const localUserId = localStorage.getItem("userId");

  try {
    const res = await axios.patch(`${API_URL}/users/${localUserId}/`, {
      url_photo: urlPhoto,
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPersonal_Info = async ({ patient }) => {
  try {
    const res = await axios.get(`${API_URL}/personal_info/`);
    const data = await res.data;
    const idData = data.filter((item) => item.patient.id === patient.id);
    return idData;
  } catch (error) {
    console.log(error);
  }
};
