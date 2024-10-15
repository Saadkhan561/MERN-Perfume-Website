import axiosInstance from "../../axiosConfig";

export const getOrders = async (params) => {
  try {
    if (params) {
      const res = await axiosInstance.get(
        `/getOrders?searchTerm=${params.searchTerm}&skip=${params.skip}`
      );
      return res.data;
    }
    const res = await axiosInstance.get("/getOrders");
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const changeOrderStatus = async (data) => {
  try {
    const res = await axiosInstance.put("/orderStatus", data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
