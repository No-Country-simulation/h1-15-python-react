import axios from "axios";
import { API_URL } from "./apiConfig";

export const getAllPatologys = async () => {
  try {
    const response = await axios.get(`${API_URL}/pathologies/`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
