import React from 'react'
import Layout from '@/layout/layout';
import CategoryCard from '@/components/cards/categoryCard';
import { useFetchAllCategories } from '@/hooks/query';

const Categories = () => {
    const { data: categories, isLoading: isCategoryLoading } =
      useFetchAllCategories();

  return (
    <Layout>
      <div className="flex justify-center w-full h-screen">
        <div className="flex gap-4 flex-wrap w-4/5 justify-center border-2">
          {categories?.map((category, index) => (
            <CategoryCard name={category.name} index={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Categories