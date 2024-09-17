import React from "react";

const ReviewCard = () => {
  return (
    <div className="rounded-xl shadow-2xl w-[300px] mob_display_product:w-11/12 h-[200px] p-2 text-sm hover:scale-105 duration-200 cursor-pointer">
      <div className="flex gap-2">
        <div className="bg-slate-800 p-1 text-xs rounded-full text-white">SK</div>
        <p className="font-semibold">Saad Nadeem Khan</p>
      </div>
      <div className="overflow-hidden text-ellipsis max-h-24 mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo ipsam
        corrupti, vel eius delectus voluptatem nam dicta quam tempora quia iure
        earum id aspernatur perspiciatis sapiente veritatis maxime esse nihil?
        Porro in ratione nostrum maiores, voluptatum magnam rem sit nulla sed,
        quam molestiae officia consectetur accusantium pariatur voluptas animi
        mollitia.
      </div>
      <div></div>
    </div>
  );
};

export default ReviewCard;
