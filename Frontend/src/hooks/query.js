import {
  fetchAllCategories,
  fetchAllproducts,
  fetchProductById,
  fetchTrendingProducts,
  searchResults
} from "@/services/productService";
import { fetchUser } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

// FOR USERS
// export const useFetchUser = (options) => {
//   return useQuery({
//     ...options,
//     queryKey: ["user"],
//     queryFn: fetchUser,
//   });
// };

export const useFetchAllProducts = (options) => {
  return useQuery({
    ...options,
    queryKey: ["products"],
    queryFn: fetchAllproducts,
  });
};

export const useFetchTrendingProducts = (options) => {
  return useQuery({
    ...options,
    queryKey: ["trendingProducts"],
    queryFn: fetchTrendingProducts
  })
}

export const useFetchAllCategories = (options) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });
};

export const useFetchProductById = (id, options) => {
  return useQuery({
    ...options,
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id)
  })
}

export const useFetchSearchResults = (param, options) =>  {
  return useQuery({
    ...options,
    queryKey: ["searchResults", param],
    queryFn: () => searchResults(param)
  })
}