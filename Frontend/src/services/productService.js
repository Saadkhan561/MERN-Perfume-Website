import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAllproducts = async () => {
  try {
    const products = await axios.get(`${BASE_URL}/getProducts`);
    return products.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchNonFilteredProducts = async () => {
  try {
    const products = await axios.get(`${BASE_URL}/getAllProducts`);
    return products.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addProduct = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/addProduct`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchAllCategories = async () => {
  try {
    const categories = await axios.get(`${BASE_URL}/getCategories`);
    return categories.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchProductById = async (id) => {
  if (id) {
    try {
      const product = await axios.get(`${BASE_URL}/getProductById/${id}`);
      return product.data;
    } catch (err) {
      console.log(err.response);
      throw new Error(err);
    }
  }
};

export const paymenyHook = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/create-checkout-session`, data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const placeOrder = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(`${BASE_URL}/placeOrder`, data);
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTrendingProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/trendingProducts`);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const restockQuantityAvailable = async (data) => {
  try {
    const res = await axios.put(`${BASE_URL}/reStock`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const togglePinStatus = async (data) => {
  try {
    const res = await axios.put(`${BASE_URL}/pinProduct`, data);
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};

export const fetchProductImages = async (data) => {
  if (data) {
    try {
      const res = await axios.get(
        `${BASE_URL}/images/${data.category}/${data.productName}`
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
    const res = await axios.get(`${BASE_URL}/search?q=${query}`);
    if (res.status == 404) {
      throw new Error("No results found");
    }
    return res.data;
  } catch (err) {
    throw new Error(err.msg);
  }
};
