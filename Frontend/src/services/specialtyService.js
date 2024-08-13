import axios from 'axios';
import { API_URL } from './apiConfig';

export const getSpecialties = async () => {
  try {
    const res = await axios.get(`${API_URL}/specialty`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};