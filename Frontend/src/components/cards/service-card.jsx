import { Headset, PackageCheck, ThumbsUp } from "lucide-react";
import React from "react";

const ServiceCard = () => {
  const tags = {
    item1: {
      icon: <ThumbsUp className="h-12 w-12" />,
      text: "Our products are meticulously crafted to meet the highest standards of quality, providing you with reliable and exceptional performance.",
    },
    item2: {
      icon: <PackageCheck  className="h-12 w-12"/>,
      text: "Experience lightning-fast delivery right to your doorstep, ensuring your order arrives promptly and efficiently.",
    },
    item3: {
      icon: <Headset className="h-12 w-12" />,
      text: "Our dedicated customer support team is available 24/7 to assist you with any questions or concerns, providing prompt and helpful solutions.",
    },
  };
  return (
    <div className="flex flex-wrap mob_display_product:flex-col mob_display:justify-center gap-8">
      {Object.entries(tags).map(([key, { icon, text }]) => (
        <div
          className="flex items-center w-[300px] h-[200px] rounded-lg shadow-2xl bg-white p-2 text-sm"
          key={key}
        >
          <div className="w-full">{icon}</div>
          <div>{text}</div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;
