import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import ReactStars from "react-rating-stars-component";

const BASE_URL = "http://localhost:4000";

const Card = ({ id, name, price, imgUrl }) => {
  return (
    <>
      {/* CARD DIV */}
      <div className="w-[200px] mob_display:w-[180px] mob_display_product:w-[220px] cursor-pointer hover:scale-105 duration-100">
        <div className="flex justify-center pb-10 h-[300px]">
          <Image
            className="object-contain"
            src={`${BASE_URL}/images/${imgUrl}`}
            alt=""
            height={300}
            width={200}
          />
        </div>
        <div className=" text-white bg-slate-800 p-2 flex flex-col gap-1">
          <p>{name}</p>
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
