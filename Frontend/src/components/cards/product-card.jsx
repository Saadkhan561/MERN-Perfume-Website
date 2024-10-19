import React from "react";
import { useRouter } from "next/router";
import { Heart } from "lucide-react";
import { useFetchProductImages } from "@/hooks/query";
import Image from "next/image";

const Card = ({ product, category }) => {
  const { data } = useFetchProductImages({
    category,
    productName: product.name,
  });
  const price =
    product?.options && Object.keys(product.options).length > 0
      ? product.options[Object.keys(product.options)[0]].price
      : undefined;

  const router = useRouter();

  return (
    <>
      {/* CARD DIV */}
      <div
        onClick={() => router.push(`/products/${product?._id}`)}
        className="w-[220px] relative mob_display:w-[180px] mob_display_product:w-[220px] cursor-pointer hover:scale-105 duration-100 group hover:shadow-lg"
      >
        <div className="flex justify-center pb-10 h-[350px]">
          <Image
            className="group-hover:opacity-90 duration-200 border rounded-lg p-1"
            src={`data:image/jpeg;base64,${data && data[0]}`}
            alt={`Product Image`}
            height={900}
            width={1600}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="p-2 flex flex-col">
          <p className="font-semibold text-lg">{product?.name}</p>
          {Object.entries(product?.options).map(([option, value]) => (
            <div  key={option} className="flex text-gray-700 text-sm justify-between">
              {value.discount !== 0 ? (
                <div className="flex gap-2">
                  <p className="line-through">{value.price} Rs</p>
                  <p className="font-semibold">{value.price - (value.price * (value.discount/100))} Rs</p>
                </div>
              ) : (
                <p>{value.price} Rs</p>
              )}
              <p>({option} ml)</p>
            </div>
          ))}
        </div>
        <p className="absolute top-5 right-2 p-1 text-sm text-white bg-red-600 rounded-lg">
          Sale
        </p>
      </div>
    </>
  );
};

export default Card;
