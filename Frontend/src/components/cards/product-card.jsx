import React from "react";
import { useRouter } from "next/router";
import { Heart } from "lucide-react";
import { useFetchProductImages } from "@/hooks/query";

const Card = ({ product, category }) => {

  const {data} = useFetchProductImages({category, productName:product.name})
  console.log(category, product.name)
  const price = product?.options && Object.keys(product.options).length > 0 
  ? product.options[Object.keys(product.options)[0]].price 
  : undefined;

  const router = useRouter();
  return (
    <>
      {/* CARD DIV */}
      <div
        onClick={() => router.push(`/products/${product?._id}`)}
        className="w-[200px] mob_display:w-[180px] mob_display_product:w-[220px] cursor-pointer hover:scale-105 duration-100"
      >
        <div className="flex justify-center pb-10 h-[300px]">
          <img
            src={`data:image/jpeg;base64,${data && data[0]}`}
            alt={`Product Image`}
            style={{ width: "200px", height: "auto", margin: "10px" }}
          />
        </div>
        <div className=" text-white bg-slate-800 p-2 flex flex-col gap-1">
          <p>{product?.name}</p>
          <p>{price} /Rs</p>
          <div className="flex items-center justify-between">
            <p className="text-xs">Add to wishlist</p>
            <Heart className="h-3 w-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
