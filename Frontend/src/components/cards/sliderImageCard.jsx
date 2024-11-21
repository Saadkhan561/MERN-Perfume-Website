import Image from "next/image";
import React from "react";

const SliderImageCard = ({imgName}) => {
  return (
    <Image
      className="sm:h-[300px] md:h-[400px] h-[250px] w-full"
      src={`/images/ad_${imgName}.jpg`}
      alt=""
      width={1600}
      height={900}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

export default SliderImageCard;
