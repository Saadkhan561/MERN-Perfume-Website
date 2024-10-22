import axios from "axios";
import axiosInstance from "../../axiosConfig";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const loginUser = async (data) => {
  try {
    const user = await axios.post(`${BASE_URL}/loginUser`, data);
    return user.data;
  } catch (err) {
    throw err.response.data.error;
  }
};

export const signupUser = async (data) => {
  try {
    const user = await axios.post(`${BASE_URL}/createUser`, data);
    return user.data;
  } catch (err) {
    throw err.response.data.error;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}/resetPassword`, data);
    return res.data;
  } catch (err) {
    throw err.response.data.error;
  }
};

export const addAddress = async(data) => {
  try{
    const res = await axiosInstance.post(`${BASE_URL}/addAddress`, data)
    return res.data
  } catch(err){
    throw err.response.data.error
  }
}
