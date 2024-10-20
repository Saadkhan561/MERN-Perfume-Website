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
import {
  useFetchAllCategories,
  useFetchAllProducts,
  useFetchTrendingProducts,
} from "@/hooks/query";
import Link from "next/link";
import Image from "next/image";
import ReviewCard from "@/components/cards/review-card";
import ServiceCard from "@/components/cards/service-card";
import { settings } from "../../carouselConfig";
import CategoryCard from "@/components/cards/categoryCard";

export default function Home() {
  const [selected, setSelected] = useState(0);

  // QUERY TO FETCH ALL PRODUCTS
  const { data: products, isLoading: isProductsLoading } =
    useFetchAllProducts();

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  const { data: trendingProducts, isLoading: trendingProductsLoading } =
    useFetchTrendingProducts();
  useEffect(() => {
    AOS.init({});
  }, []);

  const router = useRouter();

  return (
    <Layout>
      <div className="w-full flex flex-col gap-4 sm:gap-8">
        {/* MAIN AD DIV */}
        {/* <div className="flex mob_display:mt-0 mob_display:flex-col mob_display:gap-20 rounded-lg h-screen">
          <div className="flex flex-col mob_display:items-center gap-2 justify-center pt-10 pl-10 w-full">
            <div className="text-5xl mob_display:text-3xl uppercase">
              Discover the Scent of Luxury
            </div>
            <div className="pl-2 border-l-slate-800 border-l-2 mob_display:border-none mob_display:text-center mob_display:text-sm">
              Indulge in our exclusive collection of premium perfumes. Free
              shipping on orders over $50. Find your signature scent today!
            </div>
            <Link
              href={"/products"}
              className="mt-4 text-center mob_display:text-sm border border-slate-800 rounded-lg p-2 hover:bg-slate-800 hover:text-white w-max duration-200 cursor-pointer "
            >
              <button>Shop Now</button>
            </Link>
          </div>
          <div className="flex justify-center pt-40 mob_display:pt-0 w-full">
            <Slider className="h-[300px] w-[300px]" {...settings}>
              <img
                className="aspect-square object-contain"
                src="/images/per_test.jpg"
                alt=""
              />
              <img
                className="aspect-square object-contain"
                src="/images/per_test.jpg"
                alt=""
              />
              <img
                className="aspect-square object-contain"
                src="/images/per_test.jpg"
                alt=""
              />
            </Slider>
          </div>
        </div> */}

        <div className="flex justify-center h-max mob_display:pt-0">
          <Slider
            className="w-full sm:h-[300px] md:h-[400px] h-[200px] z-20"
            {...settings}
          >
            <Image
              className="sm:h-[300px] md:h-[400px] h-[200px] w-full"
              src="/images/ad_1.jpg"
              alt=""
              width={1600}
              height={900}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Image
              className="sm:h-[300px] md:h-[400px] h-[200px] w-full"
              src="/images/ad_2.jpg"
              alt=""
              width={1600}
              height={900}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Image
              className="sm:h-[300px] md:h-[400px] h-[200px] w-full"
              src="/images/ad_3.jpg"
              alt=""
              width={1600}
              height={900}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Slider>
        </div>
        <div className="flex justify-center gap-16 mob_display:items-center mob_display:mt-20">
          <div className="w-11/12 flex flex-col items-center gap-32 ">
            {/* TRENDING DIV */}
            <div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-4xl mb-4 mob_display:text-2xl">
                  Select from our trending items!
                </p>
              </div>
              <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
                {trendingProductsLoading ? (
                  <div>Loading...</div>
                ) : trendingProducts?.message ? (
                  <div className="flex w-full justify-center items-center text-xl">
                    <p>{trendingProducts?.message}</p>
                  </div>
                ) : (
                  trendingProducts?.map((item) => (
                    <Card
                      key={item._id}
                      id={item._id}
                      product={item}
                      category={item.categoryDetails.name}
                    />
                  ))
                )}
              </div>
            </div>
            {/* PRODUCTS DIV */}
            <div className="flex flex-col items-center gap-3 w-full">
              <p className="text-4xl mb-4 mob_display:text-2xl underline">
                View By Categories
              </p>
              <div className="flex w-full justify-evenly flex-wrap">
                {isCategoryLoading ? (
                  <div></div>
                ) : (
                  categories?.map((category, index) => (
                    <CategoryCard
                      id={category._id}
                      name={category.name}
                      index={index}
                    />
                  ))
                )}
              </div>
              {/* <div className="flex gap-2">
                  {categories?.map((category, index) => (
                    <p
                      key={index}
                      onClick={() => setSelected(index)}
                      className={
                        selected == index
                          ? "p-1 border border-slate-800 cursor-pointer bg-slate-800 text-white duration-100 text-center rounded-lg"
                          : "p-1 border border-slate-800 cursor-pointer text-slate-800 hover:bg-slate-800 hover:text-white duration-100 text-center rounded-lg"
                      }
                    >
                      {category.name}
                    </p>
                  ))}
                </div> */}
            </div>
            {/* <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
                {isProductsLoading ? (
                  <div>Loading...</div>
                ) : (
                  products &&
                  categories &&
                  products
                    .find((product) => product._id === categories[selected]._id)
                    ?.products.map((item) => (
                      <Card
                        key={item._id}
                        id={item._id}
                        product={item}
                        category={categories[selected].name}
                      />
                    ))
                )}
              </div> */}
            {/* REVIEWS DIV */}
            {/* <div className="flex flex-col items-center gap-10">
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
            </div> */}
            {/* SERVICES DIV */}
            <div className="flex flex-col items-center gap-10">
              <p className="text-4xl">Services provided by us!</p>
              <div data-aos="fade-up" className="">
                <ServiceCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
