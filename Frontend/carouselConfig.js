import { ChevronLeft, ChevronRight } from "lucide-react";

export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-4 top-[50%] transform -translate-y-1/2 z-30 cursor-pointer p-1"
      onClick={onClick}
    >
      <ChevronRight className="text-gray-800" size={40} />
    </div>
  );
};

// Custom Prev Arrow Component
export const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-4 top-[50%] transform -translate-y-1/2 z-20 cursor-pointer p-1"
      onClick={onClick}
    >
      <ChevronLeft className="text-gray-800" size={40} />
    </div>
  );
};

export var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};
