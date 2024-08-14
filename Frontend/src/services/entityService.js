import axios from 'axios';
import { API_URL } from './apiConfig';

export const getEntities = async () => {
  try {
    const res = await axios.get(`${API_URL}/entity`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};