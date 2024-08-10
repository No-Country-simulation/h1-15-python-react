import axios from "axios";

// Obtén la URL de la API desde la variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserData = async () => {
  try {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    if (storedFirstName && storedLastName) {
      return { first_name: storedFirstName, last_name: storedLastName };
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      throw new Error("ID de usuario o token de autenticación no encontrado");
    }

    const response = await axios.get(`${API_URL}users/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { first_name, last_name } = response.data;

    if (!first_name || !last_name) {
      throw new Error("Datos del usuario incompletos");
    }

    localStorage.setItem("firstName", first_name);
    localStorage.setItem("lastName", last_name);

    return { first_name, last_name };
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        "Error al obtener los datos del usuario",
    );
  }
};
