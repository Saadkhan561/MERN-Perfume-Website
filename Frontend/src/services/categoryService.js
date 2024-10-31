import axiosInstance from "../../axiosConfig";

export const addCategory = async (data) => {
  try {
    const res = await axiosInstance.post("/addCategory", data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const deleteCategory = async (data) => {
  console.log(data);
  try {
    const res = await axiosInstance.post(`/deleteCategory/${data.id}`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchCategoryById = async (params) => {
  try {
    const res = await axiosInstance.get(
      `/getCategoryById?categoryId=${params.id}`
    );
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const udpateCategory = async (data) => {
  try {
    const res = await axiosInstance.put("/updateCategory", data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
