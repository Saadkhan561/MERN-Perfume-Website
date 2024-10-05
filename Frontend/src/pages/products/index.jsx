import Card from "@/components/cards/product-card";
import { useFetchAllCategories, useFetchAllProducts } from "@/hooks/query";
import Layout from "@/layout/layout";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Products = () => {
  const [selected, setSelected] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const router = useRouter();

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  const { data: products, isLoading: isProductsLoading } = useFetchAllProducts({
    categoryId: categoryId
  });
  console.log(products);

  return (
    <Layout>
      <div className="flex justify-center mt-2 mob_display:mt-2 duration-200 w-4/5 h-screen">
        <div className="flex flex-col flex-start w-full">
          <div className="flex justify-center gap-2">
            {categories?.map((category, index) => (
              <div
                key={index}
                onClick={() => {
                  setCategoryId(category._id)
                  setSelected(index);
                }}
                className={
                  selected == index
                    ? "p-1 underline duration-200 cursor-pointer text-lg"
                    : "p-1 hover:underline duration-200 cursor-pointer text-lg"
                }
              >
                {category.name}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-10 flex-wrap mob_display:justify-center mob_display_product:flex-col">
            {isProductsLoading ? (
              <div>Loading...</div>
            ) : (
              products &&
              products.products?.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  product={item}
                  category={categories[selected].name}
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
