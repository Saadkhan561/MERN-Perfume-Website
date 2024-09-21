import { useRouter } from "next/router";
import { React, useState, useEffect } from "react";
import { usePlaceOrder } from "@/hooks/mutation";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";

import { MoonLoader } from "react-spinners";

// FORM IMPORTS
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { withProtectedWrapper } from "./Protected Route/protectedRoute";
import CartItemDetails from "./cartComponents/cartItemDetails";

const PaymentOption = () => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = Object.values(cart).reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  const paymentOption = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const { mutate: placeOrder, isPending: isOrderPending } = usePlaceOrder({
    onSuccess(data) {
      console.log(data);
      clearCart();
      setTimeout(() => {
        router.push("/success");
      }, 2000);
    },
    onError(error) {
      console.log(error.message);
    },
  });

  const initialValues = {
    city: "",
    address: "",
  };

  const deliverySchema = yup.object({
    city: yup.string().required("City is required"),
    address: yup.string().required("Address is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: initialValues,
    resolver: yupResolver(deliverySchema),
  });

  const onSubmit = (data) => {
    const resultArray = Object.entries(cart).flatMap(([itemKey, value]) => {
      return Object.entries(value.options).map(([optionKey, optionValue]) => {
        return {
          product: itemKey,
          quantity: optionValue.quantity,
          option: optionKey,
          price: optionValue.price,
        };
      });
    });
    const customer_id = currentUser.user._id;
    const newOrder = {
      customer: customer_id,
      products: resultArray,
      totalAmount: totalAmount,
      shippingAddress: data,
    };
    placeOrder(newOrder);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" rounded-lg bg-white shadow-2xl w-3/5 h-3/5"
      >
        {/* <div className="flex justify-end p-4 ">
          <X
            onClick={() => paymentOption("payment")}
            className="h-4 w-4 cursor-pointer"
          />
        </div> */}
        <div className="grid grid-cols-2 gap-2 p-4 h-5/6">
          <div>
            <div className="text-3xl text-center mb-6 font-semibold">
              Delivery Details
            </div>
            <div
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-rows-2 gap-2"
            >
              <div>
                <label
                  className="text-sm register_mini_div:text-xs  text-slate-500"
                  htmlFor="address"
                >
                  Enter your address
                </label>
                <input
                  className="input_field"
                  type="text"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="text-sm register_mini_div:text-xs  text-slate-500"
                  htmlFor="address"
                >
                  Enter your city
                </label>
                <input
                  className="input_field"
                  type="text"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              {Object.entries(cart).map(([key, value]) => (
                <CartItemDetails key={key} value={value} />
              ))}
              <div className="mt-5 flex justify-end gap-2">
                <p className="font-semibold">Total Amount :</p>
                {totalAmount} Rs
              </div>
            </div>
            <div className="flex gap-2 items-center w-full">
              <button disabled={isOrderPending} className=" bg-black text-white text-base w-full font-semibold  hover:bg-gray-700 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1">{isOrderPending ? <MoonLoader size={5} color="white" />:"Place Order"}</button>
              <div onClick={() => paymentOption('payment')} className=" bg-red-500 text-white text-base w-full font-semibold  hover:bg-red-600 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1">
                Cancel
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withProtectedWrapper(PaymentOption);
