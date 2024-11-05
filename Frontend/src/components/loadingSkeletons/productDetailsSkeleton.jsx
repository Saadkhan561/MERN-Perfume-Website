import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import based on your setup
import { ProductCardSkeleton } from "./productCardSkeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="w-11/12 mob_display:w-full flex flex-col gap-32 h-full">
      {/* Image and Details Section */}
      <div className="flex flex-col items-center mt-8 duration-200">
        <div className="flex items-center gap-4 mob_display:flex-col mob_display_product:gap-6 w-full">
          {/* Image Skeleton */}
          <div className="w-full flex justify-center">
            <Skeleton className="w-[500px] h-[500px] mob_display:h-[250px] mob_display:w-[250px] rounded-md" />
          </div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col gap-3 w-full mob_display:w-11/12">
            <div className="flex flex-col gap-2">
              {/* Product Name Skeleton */}
              <Skeleton className="w-1/2 h-8 mb-2 rounded" />
              {/* Discount Skeleton */}
              <Skeleton className="w-1/4 h-6 mb-2 rounded" />

              {/* Price and Description Skeleton */}
              <Skeleton className="w-1/3 h-6 mb-2 rounded" />
              <Skeleton className="w-1/5 h-5 mb-2 rounded" />
              <Skeleton className="w-1/2 h-4 rounded" />

              {/* Description Text Skeleton */}
              <div className="mt-2">
                <Skeleton className="w-full h-4 mb-2 rounded" />
                <Skeleton className="w-3/4 h-4 mb-2 rounded" />
                <Skeleton className="w-1/2 h-4 mb-2 rounded" />
              </div>
            </div>

            {/* Quantity and Amount Selection Skeleton */}
            <div className="flex flex-col gap-2 mt-4">
              <Skeleton className="w-1/3 h-5 mb-2 rounded" />
              <div className="flex gap-2">
                <Skeleton className="w-[70px] h-5 rounded-md" />
                <Skeleton className="w-[70px] h-5 rounded-md" />
                <Skeleton className="w-[70px] h-5 rounded-md" />
              </div>
            </div>

            {/* Quantity Counter Skeleton */}
            <div className="mt-4">
              <Skeleton className="w-1/4 h-5 mb-2 rounded" />
              <div className="flex gap-4 p-1 pl-2 pr-2 border border-slate-300 items-center w-fit">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="w-8 h-6 rounded-md" />
                <Skeleton className="w-6 h-6 rounded-full" />
              </div>
              <Skeleton className="w-1/2 h-4 mt-2 rounded" />
            </div>

            {/* Add to Cart Button Skeleton */}
            <Skeleton className="mt-4 w-11/12 h-10 rounded-md" />
          </div>
        </div>
      </div>

      {/* Recommendations Section Skeleton */}
      <div>
        <Skeleton className="text-3xl mob_display_product:text-center w-1/3 h-6 mb-4 rounded" />
        <div className="flex gap-5 flex-wrap p-4 mt-8 mob_display_product:flex-col">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
