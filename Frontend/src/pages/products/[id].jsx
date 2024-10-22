import Layout from "@/layout/layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/cards/product-card";
import {
  useFetchProductById,
  useFetchAllProducts,
  useFetchProductImages,
} from "@/hooks/query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCartStore from "@/store/cart";

// FOR SLIDERS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Minus, Plus } from "lucide-react";

const ProductDetails = () => {
  const [counter, setCounter] = useState(1);
  const [amount, setAmount] = useState(50);
  const router = useRouter();

  const id = router.query.id;
  const { data: product, isLoading: isProductLoading } =
    useFetchProductById(id);

  const categoryId = product?.category;
  const { data: products, isLoading: isProductsLoading } = useFetchAllProducts(
    categoryId
      ? {
          categoryId: categoryId,
        }
      : null
  );

  const { data: productImages } = useFetchProductImages({
    category: product?.categoryDetails.name,
    productName: product?.name,
  });

  const incrementCounter = () => {
    if (product?.options[amount].quantityAvailable === counter) {
      return counter;
    } else {
      setCounter(counter + 1);
    }
  };
  const decrementCounter = () => {
    if (counter === 1) {
      return counter;
    } else {
      setCounter(counter - 1);
    }
  };

  const initialValues = {
    amount: null,
  };

  const productSchema = yup.object({
    amount: yup.string().required("Amount is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(productSchema),
  });

  const { addItem, cart } = useCartStore();
  const onSubmit = (data) => {
    addItem(
      {
        ...product,
        quantity: counter,
        amount: parseInt(data.amount),
      },
      product._id
    );
  };

  // FOR SLIDER
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

  return (
    <Layout>
      <div className="w-11/12 mob_display:w-full flex flex-col gap-32 h-full">
        <div className="flex flex-col items-center mt-8 duration-200">
          {/* DETAILS DIV */}
          <div className="flex items-center gap-4 mob_display:flex-col mob_display_product:gap-6">
            <div className="w-full">
              <div className="flex justify-center  mob_display:pt-0 w-full">
                <Slider
                  className="w-[500px] h-[500px] mob_display:h-[250px] mob_display:w-[250px]"
                  {...settings}
                >
                  {productImages?.map((base64Image, index) => (
                    <img
                      className="aspect-square object-contain"
                      key={index}
                      src={`data:image/jpeg;base64,${base64Image}`}
                      alt={`Product Image ${index + 1}`}
                    />
                  ))}
                </Slider>
              </div>
            </div>
            {/* PRODUCT DETAILS DIV */}
            {product && (
              <div className="flex flex-col gap-3 w-full mob_display:w-11/12">
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-3xl mob_display:text-xl font-semibold">
                      {product.name}
                    </p>
                    {product.options[amount].discount !== 0 && (
                      <p className="text-red-500 font-semibold">
                        {product.options[amount].discount} % Off
                      </p>
                    )}
                  </div>
                  <div className="text-lg  text-slate-600 mob_display:text-base flex flex-col">
                    {product.options[amount].discount !== 0 ? (
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-1 font-semibold">
                          <p>
                            {product.options[amount].price -
                              (product.options[amount].price *
                                product.options[amount].discount) /
                                100}
                          </p>
                          <p className="test-md">/Rs</p>
                        </div>
                        <div className="flex gap-1 line-through text-gray-500 text-sm">
                          <p>{product.options[amount].price}</p>
                          <p className="test-md">/Rs</p>
                        </div>{" "}
                      </div>
                    ) : (
                      <div className="flex gap-1 font-semibold">
                        <p>{product.options[amount].price}</p>
                        <p className="test-md">/Rs</p>
                      </div>
                    )}
                    <div className="text-sm">(For {amount}ml)</div>
                  </div>
                </div>
                <div>
                  <p className="text-xl mob_display:text-base font-semibold">
                    Description
                  </p>
                  <p className="text-sm">{product.description}</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-2">
                    <p className="mob_display:text-sm">Amout available</p>
                    <div className="flex gap-2 mob_display:text-sm">
                      {Object.entries(product.options).map(([key]) => (
                        <div key={key} className="flex justify-center">
                          <input
                            type="radio"
                            id={`option${key}`}
                            name="amount"
                            className="hidden peer"
                            value={key}
                            onClick={(e) => setAmount(e.target.value)}
                            {...register("amount")}
                          />
                          <label
                            className="text-black peer-checked:bg-black text-center pb-6 rounded-md duration-200 peer-checked:text-white border border-black cursor-pointer w-[70px] h-[20px]"
                            htmlFor={`option${key}`}
                          >
                            {key}ml
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.amount && (
                      <p className="text-xs text-red-500">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="text-gray-500 font-semibold mb-2">
                      Quantity
                    </div>
                    <div className="w-fit flex gap-4 p-1 pl-2 pr-2 border border-slate-300 items-center">
                      <Minus
                        onClick={decrementCounter}
                        size={30}
                        color="black"
                        className="p-1 cursor-pointer"
                      />
                      <div className="text-lg">{counter}</div>
                      <Plus
                        onClick={incrementCounter}
                        size={30}
                        color="black"
                        className="p-1 cursor-pointer"
                      />
                    </div>
                    <div className="text-xs text-gray-500 font-semibold mt-2">
                      Available : {product.options[amount].quantityAvailable}
                    </div>
                  </div>
                  <button className="mt-4 bg-black text-white w-11/12 text-lg font-semibold  hover:bg-gray-700 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-2">
                    Add to cart
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        {/* RECOMMENDATIONS DIV */}
        <div>
          <div className="text-3xl mob_display_product:text-center">
            More Recommendations
          </div>
          <div className="flex gap-5 flex-wrap p-4 mt-8 mob_display_product:flex-col">
            {isProductsLoading ? (
              <div>Loading...</div>
            ) : (
              products[0]?.products?.map((item) => (
                <div>
                  <Card
                    key={item._id}
                    id={item._id}
                    product={item}
                    category={item.categoryDetails.name}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
