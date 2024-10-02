// import axiosInstance from "axiosInstance";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import axiosInstance from "../../axiosConfig";

export const fetchAllproducts = async () => {
  try {
    const products = await axiosInstance.get("/getProducts");
    return products.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchNonFilteredProducts = async (params) => {
  try {
    if (params) {
      const products = await axiosInstance.get(
        `/getAllProducts?category=${params.filter || ""}&skip=${params.skip}`
      );
      return products.data;
    } else {
      const products = await axiosInstance.get("/getAllProducts");
      return products.data;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addProduct = async (data) => {
  try {
    const res = await axiosInstance.post("/addProduct", data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchAllCategories = async () => {
  try {
    const categories = await axiosInstance.get("/getCategories");
    return categories.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchProductById = async (id) => {
  if (id) {
    try {
      const product = await axiosInstance.get(`/getProductById/${id}`);
      return product.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err);
    }
  }
};

export const paymenyHook = async (data) => {
  try {
    const res = await axiosInstance.post("/create-checkout-session", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const placeOrder = async (data) => {
  console.log(data);
  try {
    const res = await axiosInstance.post("/placeOrder", data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTrendingProducts = async () => {
  try {
    const res = await axiosInstance.get("/trendingProducts");
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const restockQuantityAvailable = async (data) => {
  try {
    const res = await axiosInstance.put("/reStock", data);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const togglePinStatus = async (data) => {
  try {
    const res = await axiosInstance.put("/pinProduct", data);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const toggleProductStatus = async (data) => {
  try {
    const res = await axiosInstance.put("/deleteProduct", data);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const setDiscount = async (data) => {
  try {
    const res = await axiosInstance.put("/setDiscount", data);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const fetchProductImages = async (data) => {
  if (data) {
    try {
      const res = await axiosInstance.get(
        `/images/${data.category}/${data.productName}`
      );
      return res.data;
    } catch (err) {
      throw new Error(err.msg);
    }
  }
};

export const searchResults = async (param) => {
  const query = param.query;
  try {
    const res = await axiosInstance.get(`/search?q=${query}`);
    if (res.status == 404) {
      throw new Error("No results found");
    }
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};
