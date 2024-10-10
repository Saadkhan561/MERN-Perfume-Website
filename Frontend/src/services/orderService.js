import axiosInstance from "../../axiosConfig";

export const getOrders = async () => {
  try {
    const res = await axiosInstance.get("/getOrders");
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
