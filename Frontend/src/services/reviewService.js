import axios from "axios";
import { API_URL } from "./apiConfig";

export const submitReview = async (doctorId, description, rating) => {
  const url = `${API_URL}/doctor/${doctorId}/reviews/`;
  const data = { description, rating };

  try {
    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    console.error(
      "Error submitting review:",
      error.response?.data || error.message,
    );

    throw new Error(
      error.response?.data?.detail || "Error al enviar la reseña",
    );
  }
};
