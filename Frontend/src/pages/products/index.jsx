import Card from "@/components/cards/product-card";
import { useFetchAllCategories, useFetchAllProducts } from "@/hooks/query";
import Layout from "@/layout/layout";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Products = () => {
  const [selected, setSelected] = useState(0);
  const categoryId = useSearchParams().get("id");

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  const { data: products, isLoading: isProductsLoading } = useFetchAllProducts({
    categoryId: categoryId,
  });

  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div className="w-full h-[250px] relative">
          <Image
            src="/images/route_bg.jfif"
            alt="route_bg"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-0 w-full h-full left-0">
            <div className="flex flex-col gap-2 h-full text-white items-center justify-center">
              <p className="text-5xl font-semibold">Products</p>
              <div className="flex items-center gap-2">
                <Link className="hover:underliner" href="/">
                  Home
                </Link>
                <p>&gt;</p>
                <Link className="hover:underliner" href="/categories">
                  Categories
                </Link>
                <p>&gt;</p> Products
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 mob_display:mt-2 duration-200 w-full h-full">
          <div className="flex flex-col flex-start w-4/5">
            <div className="flex gap-4 mt-10 flex-wrap mob_display:justify-center mob_display_product:flex-col">
              {isProductsLoading ? (
                <div>Loading...</div>
              ) : products?.message ? (
                <div className="flex justify-center items-center w-full h-full">
                  <div className="flex justify-center p-4 gap-2 items-center">
                    <p>{products.message}</p>
                  </div>
                </div>
              ) : (
                categories &&
                products[0].products?.map((item) => (
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
      </div>
    </Layout>
  );
};

export default Products;
