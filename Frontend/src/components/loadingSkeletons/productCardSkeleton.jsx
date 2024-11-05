import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="w-[220px] relative flex flex-col gap-2 mob_display:w-[180px] mob_display_product:w-[220px]">
      <Skeleton className="flex justify-center pb-10 h-[300px]" />
      <Skeleton className="w-3/5 p-2" />
      <div className="flex justify-between items-center">
      <Skeleton className="p-2 w-[50px]" />
      <Skeleton className="p-2 w-[50px]" />
      </div>
    </div>
  );
}
