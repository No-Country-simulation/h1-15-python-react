import axios from "axios";
import { API_URL } from "./apiConfig";

export const getUserData = async () => {
  const localUserId = localStorage.getItem("userId");

  try {
    const res = await axios.get(`${API_URL}/users/${localUserId}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
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
