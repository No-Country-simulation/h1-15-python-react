import axios from "axios";
import { API_URL } from "./apiConfig";

export const getHistorys = async () => {
  const response = await axios.get(`${API_URL}/clinical_history/`);
  const data = await response.data;
  return data;
};
