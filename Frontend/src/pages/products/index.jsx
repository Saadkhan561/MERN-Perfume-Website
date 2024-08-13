import Card from "@/components/cards/card";
import {
  useFetchAllCategories,
  useFetchAllProducts,
  useFetchSearchResults,
} from "@/hooks/query";
import Layout from "@/layout/layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const BASE_URL = "http://localhost:4000";

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  const router = useRouter();

  const {
    data: products,
    isLoading: isProductLoading,
    refetch,
  } = useFetchAllProducts();

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  useEffect(() => {
    const { category: queryCategory } = router.query;
    if (queryCategory) {
      const filtered =
        products &&
        queryCategory &&
        products.filter((product) => product.category === queryCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
      refetch();
      router.push("/products");
    }
  }, [router.query.category, products]);

  return (
    <Layout>
      <div
        className={
          eval(router.query.open)
            ? "flex justify-center mt-10 mob_display:mt-2 opacity-40 duration-200"
            : "flex justify-center mt-10 mob_display:mt-2 opacity-100 duration-200"
        }
      >
        <div className="flex flex-col w-4/5 mob_display:w-11/12">
          <div className="flex justify-center">
            <div className="flex gap-2 text-sm text-slate-500 mb-6 font-semibold">
              <Link className="hover:underline cursor-pointer" href={"/"}>
                Home
              </Link>
              <p>/</p>
              <Link
                className="hover:underline cursor-pointer"
                href={"/products"}
              >
                Products
              </Link>
            </div>
          </div>
          <div className="text-end">
            <select
              className="border border-gray-500 rounded-md p-1 text-sm focus:outline-none cursor-pointer duration-200 text-gray-500"
              name="categories"
              onChange={(event) =>
                router.push({
                  pathname: "/products",
                  query: { category: event.target.value },
                })
              }
            >
              <option className="p-1" value={""}>
                Show All
              </option>
              {categories &&
                categories.map((category) => (
                  <option className="p-1" value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-8 p-10 mob_display_product:gap-x-4 mob_display_product:gap-y-10 mob_display_product:p-2 mob_display:justify-center">
            {isProductLoading ? (
              <div>Loading...</div>
            ) : (
              filteredProducts?.map((product) => (
                <Card
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  imgUrl={product.imageUrl}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
