import axios from 'axios';

// Obtén la URL de la API desde la variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

export const getSpecialties = async () => {
  try {
    const res = await axios.get(`${API_URL}/specialty`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};