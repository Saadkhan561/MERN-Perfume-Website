import Layout from "@/layout/layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "@/components/cards/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BASE_URL = "http://localhost:4000";

import { useRouter } from "next/router";
import { useFetchAllProducts } from "@/hooks/query";
import Link from "next/link";
import Image from "next/image";
import ReviewCard from "@/components/cards/review-card";
import ServiceCard from "@/components/cards/service-card";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const categories = ["Perfume", "Oils", "Oodh", "Attar"];
  // QUERY TO FETCH ALL PRODUCTS
  const { data: products, isLoading: isProductsLoading } =
    useFetchAllProducts();
  products && console.log(products);

  useEffect(() => {
    AOS.init({});
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: false,
    prevArrow: false,
  };

  const router = useRouter();

  return (
    <Layout>
      <div className="w-11/12">
        {/* MAIN AD DIV */}
        <div className="flex mt-20 mob_display:mt-0 mob_display:flex-col-reverse h-screen">
          <div className="flex flex-col mob_display:items-center gap-2 justify-center pt-10 pl-10 w-full">
            <div className="text-5xl mob_display:text-3xl">
              Discover the Scent of Luxury
            </div>
            <div className="pl-2 border-l-slate-800 border-l-2 mob_display:border-none mob_display:text-center mob_display:text-sm">
              Indulge in our exclusive collection of premium perfumes. Free
              shipping on orders over $50. Find your signature scent today!
            </div>
            <div className="mt-4 text-center mob_display:text-sm border border-slate-800 rounded-lg p-2 hover:bg-slate-800 hover:text-white w-max duration-200 cursor-pointer ">
              <button>Shop Now</button>
            </div>
          </div>
          <div className="flex justify-center pt-40 mob_display:pt-0 w-full">
            <Slider className="h-[300px] w-[300px]" {...settings}>
              <Image
                src="/images/per_test.jpg"
                alt=""
                height={300}
                width={300}
              />
              <Image
                src="/images/per_test.jpg"
                alt=""
                height={300}
                width={300}
              />
              <Image
                src="/images/per_test.jpg"
                alt=""
                height={300}
                width={300}
              />
            </Slider>
          </div>
        </div>
        <div className="flex flex-col mob_display:items-center mob_display:mt-20 gap-32">
          {/* TRENDING DIV */}
          <div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-4xl mb-4 mob_display:text-2xl">
                Select from our trending items!
              </p>
            </div>
            <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
              {isProductsLoading ? (
                <div>Loading...</div>
              ) : (
                products?.map((product) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    imgUrl={product.imageUrl}
                  />
                ))
              )}
            </div>
          </div>
          {/* PRODUCTS DIV */}
          <div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-4xl mb-4 mob_display:text-2xl underline">
                View By Categories
              </p>
              <div className="flex gap-2">
                {categories.map((category, index) => (
                  <p key={index} onClick={() => setSelected(index)} className={selected == index ? "p-1 border border-slate-800 cursor-pointer bg-slate-800 text-white duration-100 text-center rounded-lg":"p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg"}>
                    {category}
                  </p>
                ))}
                {/* <p className="active:bg-slate-800 p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg">
                  Perfumes
                </p>
                <p className="p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg">
                  Oils
                </p>
                <p className="p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg">
                  Oodh
                </p>
                <p className="p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg">
                  Attar
                </p> */}
              </div>
            </div>
            <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
              {isProductsLoading ? (
                <div>Loading...</div>
              ) : (
                products?.map((product) => (
                  <Card
                    key={product._id}
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    imgUrl={product.imageUrl}
                  />
                ))
              )}
            </div>
          </div>
          {/* TESTERS DIV */}
          {/* <div>
            <div className="flex flex-col items-center gap-3">
              <p className="text-4xl mb-4 mob_display:text-2xl underline">
                Testers
              </p>
              <div className="flex gap-2">
                <p className="p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg">
                  Men
                </p>
                <p className="p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg">
                  Women
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div> */}
          {/* REVIEWS DIV */}
          <div className="flex flex-col items-center gap-10">
            <p className="text-4xl mob_display:text-2xl">
              See What Our Customers Are Saying!
            </p>
            <div
              data-aos="fade-up"
              className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col gap-8"
            >
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </div>
          </div>
          {/* SERVICES DIV */}
          <div className="flex flex-col items-center gap-10">
            <p className="text-4xl">Services provided by us!</p>
            <div data-aos="fade-up" className="">
              <ServiceCard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
