import Layout from "@/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/cards/card";
import { useFetchProductById, useFetchAllProducts } from "@/hooks/query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCartStore from "@/store/cart";

const ProductDetails = () => {
  const [counter, setCounter] = useState(1)
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProduct] = useState(null)

  const {
    data: products,
    isLoading: isProductLoading,
  } = useFetchAllProducts();

  const id = router.query.id;
  const { data, isLoading } = useFetchProductById(id);

  const incrementCounter =() => {
    if (data&& data.quantityAvailable === counter) {
      return counter
    } else {
      setCounter(counter + 1)
    }
  }
  const decrementCounter =() => {
    if (counter === 1) {
      return counter
    } else {
      setCounter(counter - 1)
    }
  }

  useEffect(() => {
    const productsArray =
      products &&
      data &&
      products
        .filter((product) => product.category === data.category)
        .slice(0, 5);
    setFilteredProducts(productsArray);

    if (data) {
      setProduct(data)
    }
  }, [products, data]);

  const initialValues = {
    size: "medium",
  };

  const productSchema = yup.object({
    size: yup.string().required("Size is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(productSchema),
  });

  const {addItem, cart} = useCartStore()
  const onSubmit = (data) => {
    addItem({...product,  quantity: counter, size: data.size}, product._id)
  };

  const BASE_URL = "http://localhost:4000";

  return (
    <Layout>
      <div
        className={
          eval(router.query.open)
            ? "flex flex-col items-center mt-14 opacity-40 duration-200"
            : "flex flex-col items-center mt-14 opacity-100 duration-200"
        }
      >
        <div className="flex gap-2 text-sm text-slate-500 mb-6 font-semibold">
          <a className="hover:underline cursor-pointer" href="/">
            Home
          </a>
          <p>/</p>
          <a className="hover:underline cursor-pointer" href="/products">
            Products
          </a>
          <p>/</p>
          <a className="hover:underline cursor-pointer" href="/product_details">
            Product Details
          </a>
        </div>
        {/* DETAILS DIV */}
        <div className="w-4/5 flex items-center gap-10 mob_display_product:flex-col mob_display_product:gap-6">
          {/* CAROUSEL DIV */}
          <div className="flex justify-center h-[300px] w-[400px]">
            {data && (
              <img
                className="h-[280px] w-[300px] mob_display:h-[300px] mob_display:w-[300px]"
                src={`${BASE_URL}/images/${data.imageUrl}`}
                alt=""
              />
            )}
          </div>
          {/* PRODUCT DETAILS DIV */}
          {data && (
            <div className="p-4 flex flex-col gap-3 w-3/5 mob_display:w-11/12">
              <div className="flex justify-between items-center flex-wrap">
                <p className="text-2xl mob_display:text-xl font-semibold">
                  {data.name}
                </p>
                <p className="text-lg text-slate-600 mob_display:text-base flex gap-1">
                  {data.price}
                  <p className="test-md">/Rs</p>
                </p>
              </div>
              <div>
                <p className="text-xl mob_display:text-base font-semibold">
                  Description
                </p>
                <p className="text-sm">
                  {data.description} Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Quasi architecto reiciendis accusamus
                  tempore aliquam dolorum dolor cum cupiditate est laudantium,
                  a, magni quis! Unde impedit provident aspernatur ipsam
                  laboriosam suscipit saepe fugit. Libero necessitatibus
                  architecto quidem deleniti, ea illo soluta dolore at nobis eos
                  sunt repellat praesentium quas dolorum sint.
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <div>
                  <p className="mob_display:text-sm">Colors available</p>
                  <div className="flex gap-5 items-center mob_display:text-xs">
                    <div className="flex gap-2 items-center">
                      <input
                        className="appearance-none w-4 h-4 cursor-pointer border-gray-500 border rounded-lg checked:border-transparent checked:bg-black hover:border-black duration-100"
                        type="radio"
                        name="color"
                        value={'Red'}
                        {...register("color")}
                      />
                      <label className="text-sm" htmlFor="checkBox">
                        Red
                      </label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        className="appearance-none w-4 h-4 cursor-pointer border-gray-500 border rounded-lg checked:border-transparent checked:bg-black hover:border-black duration-100"
                        type="radio"
                        name="color"
                        value={'Black'}
                        {...register("color")}
                      />
                      <label className="text-sm" htmlFor="checkBox">
                        Black
                      </label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        className="appearance-none w-4 h-4 cursor-pointer border-gray-500 border rounded-lg checked:border-transparent checked:bg-black hover:border-black duration-100"
                        type="radio"
                        name="color"
                        {...register("color")}
                      />
                      <label className="text-sm" htmlFor="checkBox">
                        White
                      </label>
                    </div>
                  </div>
                </div> */}
                <div className="flex flex-col gap-2">
                  <p className="mob_display:text-sm">Size available</p>
                  <div className="flex gap-2 mob_display:text-sm">
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="option1"
                        name="size"
                        className="hidden peer"
                        value={"small"}
                        {...register("size")}
                      />
                      <label
                        className="text-black peer-checked:bg-black text-center pb-6 rounded-md duration-200 peer-checked:text-white border border-black cursor-pointer w-[70px] h-[20px]"
                        htmlFor="option1"
                      >
                        S
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="option2"
                        name="size"
                        className="hidden peer"
                        value={"medium"}
                        {...register("size")}
                      />
                      <label
                        className="text-black peer-checked:bg-black text-center pb-6 rounded-md duration-200 peer-checked:text-white border border-black cursor-pointer w-[70px] h-[20px]"
                        htmlFor="option2"
                      >
                        M
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="option3"
                        name="size"
                        value={"large"}
                        className="hidden peer"
                        {...register("size")}
                      />
                      <label
                        className="text-black peer-checked:bg-black text-center pb-6 rounded-md duration-200 peer-checked:text-white border border-black cursor-pointer w-[70px] h-[20px]"
                        htmlFor="option3"
                      >
                        L{" "}
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <input
                        type="radio"
                        id="option4"
                        name="size"
                        value={"xl"}
                        className="hidden peer"
                        {...register("size")}
                      />
                      <label
                        className="text-black peer-checked:bg-black text-center pb-6 rounded-md duration-200 peer-checked:text-white border border-black cursor-pointer w-[70px] h-[20px]"
                        htmlFor="option4"
                      >
                        XL{" "}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-gray-500 font-semibold mb-2">Quantity</div>
                  <div className="w-fit flex gap-4 p-1 pl-2 pr-2 border border-slate-200 items-center">
                    <div onClick={decrementCounter} className="hover:bg-slate-100 duration-500 cursor-pointer">
                      <img
                        src="/images/minus.png"
                        alt=""
                        height={15}
                        width={15}
                      />
                    </div>
                    <div>
                      {counter}
                    </div>
                    <div onClick={incrementCounter} className="hover:bg-slate-100 duration-500 cursor-pointer">
                      <img
                        src="/images/plus.png"
                        alt=""
                        height={15}
                        width={15}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mt-2">
                    Available : {data.quantityAvailable}
                  </div>
                </div>
                <div className="mt-4 font-semibold text-md">
                  <button className="bg-black text-white w-[200px] rounded-sm p-1 cursor-pointer hover:bg-white hover:text-black border hover:border-black duration-200 mob_display:text-sm">
                    Add to cart
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {/* RECOMMENDATIONS DIV */}
      <div className="flex justify-center">
        <div className="flex w-4/5 mt-20 relative">
          <div>
            {/* CARD MAIN DIV */}
            <div className="flex justify-between items-center">
              <div className="text-3xl font-semibold">More Recommendations</div>
            </div>
            {/* CARDS */}
            <div className="flex gap-5 flex-wrap p-4 mt-8">
              {filteredProducts?.map((item) => (
                <div>
                  <Card
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    imgUrl={item.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
