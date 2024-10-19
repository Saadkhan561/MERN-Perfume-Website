import Image from "next/image";
import React from "react";
import { categoryImages } from "../../../categoryImages";
import { useRouter } from "next/navigation";

const CategoryCard = ({ name, index, id }) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(`/products?id=${id}`)} className="sm:w-[500px] w-[400px] rounded-lg flex flex-col gap-4 items-center p-4 hover:scale-105 cursor-pointer duration-500 group">
      <p className="text-3xl font-semibold">{name}</p>
      <Image
        className="aspect-square group-hover:opacity-90 duration-200"
        src={`/images/${categoryImages[index]}.jpg`}
        alt="product"
        width={1600}
        height={900}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <p className="text-gray-500 text-sm text-center" >
        Discover the essence of luxury with our exclusive range of perfumes.
        Crafted from the finest ingredients, each fragrance tells a unique
        story, leaving a lasting impression. Find your perfect scent and elevate
        every moment.
      </p>
      <button className="border-b-2 border-black p-1 font-semibold">Shop now</button>
    </div>
  );
};

export default CategoryCard;
