import axios from "axios";
import { setDoctorInfo } from "../redux/slice/doctorSlice";
import { store } from "../redux/store";

const API_URL = import.meta.env.VITE_API_URL;
export const fetchDoctorData = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}doctor/${doctorId}`);
    store.dispatch(setDoctorInfo(response.data));
  } catch (error) {
    console.error("Error fetching patient data:", error);
    throw error;
  }
};
