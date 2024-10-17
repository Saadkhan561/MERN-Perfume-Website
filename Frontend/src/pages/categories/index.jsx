import React from "react";
import Layout from "@/layout/layout";
import CategoryCard from "@/components/cards/categoryCard";
import { useFetchAllCategories } from "@/hooks/query";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  return (
    <Layout>
      <div className="flex flex-col items-center w-full h-auto mb-20">
        <div className="w-full h-[250px] relative">
          <Image
            src="/images/route_bg.jfif"
            alt="route_bg"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute top-0 w-full h-full left-0">
            <div className="flex flex-col gap-2 h-full text-white items-center justify-center">
              <p className="text-5xl font-semibold">Categories</p>
              <div>
                <p>
                  <Link className="hover:underliner" href="/">Home</Link> &gt; Categories
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full flex-wrap justify-evenly p-8">
          {isCategoryLoading ? (<div>
            
          </div>): categories?.map((category, index) => (
            <CategoryCard
              id={category._id}
              name={category.name}
              index={index}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
