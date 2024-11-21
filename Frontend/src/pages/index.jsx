import Layout from "@/layout/layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "@/components/cards/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFetchAllCategories, useFetchTrendingProducts } from "@/hooks/query";
import Image from "next/image";
import ReviewCard from "@/components/cards/review-card";
import ServiceCard from "@/components/cards/service-card";
import { settings } from "../../carouselConfig";
import CategoryCard from "@/components/cards/categoryCard";
import { ProductCardSkeleton } from "@/components/loadingSkeletons/productCardSkeleton";
import CategoryCardSkeleton from "@/components/loadingSkeletons/categoryCardSkeleton";
import Meta from "@/components/metaTags/meta";
import SliderImageCard from "@/components/cards/sliderImageCard";

export default function Home() {

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  const { data: trendingProducts, isLoading: trendingProductsLoading } =
    useFetchTrendingProducts();
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <Layout>
      <Meta
        title="Perfume Shop - Luxury Fragrances"
        description="Discover luxury perfumes and fragrances at the Perfume Shop. Shop the latest collections and exclusive scents."
        keywords="perfume, fragrance, luxury perfume, perfume shop"
      />
      <div className="w-full flex flex-col gap-4 sm:gap-8">
        {/* MAIN AD DIV */}
        <div className="flex justify-center h-max mob_display:pt-0">
          <Slider
            className="w-full sm:h-[300px] md:h-[400px] h-[250px] z-20"
            {...settings}
          >
            {Array.from({length: 3}).map((img, index) => (
              <SliderImageCard key={index} imgName={index+1} />
            ))}
            {/* <Image
              className="sm:h-[300px] md:h-[400px] h-[250px] w-full"
              src="/images/ad_1.jpg"
              alt=""
              width={1600}
              height={900}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Image
              className="sm:h-[300px] md:h-[400px] h-[250px] w-full"
              src="/images/ad_2.jpg"
              alt=""
              width={1600}
              height={900}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Image
              className="sm:h-[300px] md:h-[400px] h-[250px] w-full"
              src="/images/ad_3.jpg"
              alt=""
              width={1600}
              height={900}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            /> */}
          </Slider>
        </div>
        <div className="flex justify-center gap-16 mob_display:items-center mob_display:mt-20">
          <div className="w-11/12 flex flex-col items-center gap-28">
            {/* TRENDING DIV */}
            <div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-4xl mb-4 mob_display:text-2xl">
                  Select from our trending items!
                </p>
              </div>
              <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
                {trendingProductsLoading ? (
                  <div className="flex flex-wrap mob_display:justify-center mob_display_product:flex-col mob_display_product:items-center gap-4 mt-6">
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                  </div>
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
              <div className="flex w-full justify-around flex-wrap">
                {isCategoryLoading ? (
                  <div className="flex w-full justify-evenly flex-wrap">
                    <CategoryCardSkeleton />
                    <CategoryCardSkeleton />
                  </div>
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
