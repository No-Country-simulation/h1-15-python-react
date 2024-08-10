import axios from 'axios';

// Obtén la URL de la API desde la variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

export const activatePatient = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/patient/`, data);
    return response.data;
  } catch (error) {
    console.error('Error al activar el paciente:', error.message); 
    if (error.response) {
      console.error('Respuesta del error:', error.response.data); 
      console.error('Código de estado del error:', error.response.status); 
    } else {
      console.error('Error sin respuesta:', error.message); 
    }
    throw error;
  }
};


export const verifyUserStatus = async (authToken) => {
  try {
    const response = await axios.get(`${API_URL}patient/verify_user/`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al verificar el estado del paciente:', error);
    throw error; 
  }
};