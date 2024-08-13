import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import useCartStore from "@/store/cart";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { usePaymentHook } from "@/hooks/mutation";
import { withProtectedWrapper } from "@/components/Protected Route/protectedRoute";

const BASE_URL = "http://localhost:4000";

const Cart = () => {
  const [isClient, setIsClient] = useState(false)
  const { cart, deleteItem } = useCartStore();
  const [totalAmount, setTotalAmount] = useState(0);
  const cartLength = Object.keys(cart).length;
  // console.log(cart);
  const router = useRouter();

  const paymentOption = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  
  useEffect(() => {
    const amount = Object.values(cart).reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    setTotalAmount(amount);
    setIsClient(true)
  }, [cart]);
  
  const { mutate: payment } = usePaymentHook({
    onSuccess: async(data) => {
      const stripe = await loadStripe(
          "pk_test_51PJwoeISVl2eCOfi889RKDeGaatWGUuEtsJ5gUYFxPzro603EcLAo9QcVMqPS9JpKYfuSmbB8WOA65GTXKHNSUK600RxheWupQ"
        );
      console.log(data);
      const result = stripe.redirectToCheckout({
        sessionId: data.id,
      });
    },
    onError:(data) => {
      console.log(data);
    },
  });

  const makePayment = async () => {
    payment(cart);
    // console.log(data)
  };

  if (!isClient) {
    return null
  }

  return (
    <Layout>
      <div className="flex justify-center ">
        <div className="flex cart:flex-col w-4/5 h-screen">
          <div className="p-4 cart:p-1 w-full cart:pb-10">
            <div className="flex flex-col gap-2 p-2">
              <div className="text-2xl font-semibold p-1">Your Cart Items</div>
              {cartLength === 0 ? (
                <div>Your cart is empty</div>
              ) : (
                Object.entries(cart).map(([key, value]) => {
                  return (
                    <div key={key} className=" flex flex-col w-full border border-slate-300 rounded-lg p-2">
                      <div className="flex justify-between items-center hover:bg-slate-100 duration-200 cursor-pointer">
                        <div className="flex gap-2 items-center">
                          <div>
                            <img
                              onClick={() =>
                                router.push(`/products/${value._id}`)
                              }
                              className="h-[70px] w-[70px] mob_display:h-[50px] mob_display:w-[50px]"
                              src={`${BASE_URL}/images/${value.imageUrl}`}
                              alt=""
                            />
                          </div>
                          <div className=" text-lg mob_display:text-sm">
                            {value.name}
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="text-gray-800 font-semibold pr-8 mob_display:text-xs mob_display:pr-0">
                            Quantity: {value.quantity}
                          </div>
                          <div
                            className="z-10"
                            onClick={() => deleteItem(value._id)}
                          >
                            <img
                              className="hover:bg-slate-200 duration-200 rounded-full p-1 cursor-pointer"
                              src="/images/trash.png"
                              alt=""
                              height={30}
                              width={30}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="border-l cart:border-l-0 cart:border-t border-slate-200 pt-14 p-4 cart:w-full w-4/5 cart:p-1 cart:pt-4">
            <div>
              {Object.entries(cart).map(([key, value]) => (
                <div key={key}>
                  <div key={key} className="flex justify-between p-2">
                    <div className="flex gap-1 font-semibold">
                      <p>
                        {value.name} x {value.quantity}
                      </p>
                    </div>
                    <div>{value.quantity * value.price} Rs</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <p className="font-semibold">Total Amount :</p>
              {totalAmount} Rs
            </div>
            {cartLength ? (
              <div className="w-full flex justify-end mt-5">
                <div
                  onClick={() => paymentOption("payment")}
                  className=" bg-black text-white text-base font-semibold hover:text-black hover:bg-white hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1"
                >
                  <button>Proceed to checkout</button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withProtectedWrapper(Cart);
