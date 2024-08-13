import axios from 'axios';
import { API_URL } from './apiConfig';

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