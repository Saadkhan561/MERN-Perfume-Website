import React from "react";
import { Skeleton } from "../ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="sm:w-[600px] w-[400px] rounded-lg flex flex-col gap-4 items-center p-4">
      <Skeleton className="w-[100px] h-[20px] text-center" />
      <Skeleton className="w-full h-[500px] p-1 rounded-lg" />
      <Skeleton className="h-[10px] w-full" />
      <Skeleton className="h-[10px] w-full" />
      <Skeleton className="h-[10px] w-full" />
      <Skeleton className="w-[60px] h-[20px]" />
    </div>
  );
};

export default CategoryCardSkeleton;
