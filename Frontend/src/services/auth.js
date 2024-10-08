import axios from "axios";
import { API_URL } from "./apiConfig";

// Obtén la URL de la API desde apiConfig

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, { email, password });

    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.response?.data?.detail || "Error al iniciar sesión");
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("userEmail");

    if (!userId || !email) {
      throw new Error("ID de usuario o correo electrónico no encontrado");
    }

    const response = await axios.patch(
      `${API_URL}/users/${userId}/change_password/`,
      { email, password: newPassword },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(
      error.response?.data?.detail || "Error al actualizar la contraseña",
    );
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, formData);

    return response.data;
  } catch (error) {
    let errorMessage = "An error occurred while registering the user.";

    if (error.response) {
      const { data } = error.response;
      if (data) {
        errorMessage = Object.values(data).flat().join(", ") || errorMessage;
      }
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = error.message;
    }

    throw new Error(`Error registering user: ${errorMessage}`);
  }
};

export const logout = (navigate) => {
  const keysToRemove = [
    "userType",
    "userId",
    "firstName",
    "lastName",
    "authToken",
    "userEmail",
    "patient_id",
  ];

  keysToRemove.forEach((key) => localStorage.removeItem(key));

  navigate("/");
};
