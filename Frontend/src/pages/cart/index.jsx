import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout";
import useCartStore from "@/store/cart";
import { useRouter } from "next/router";
import CartItem from "@/components/cartComponents/cartItems";
import CartItemDetails from "@/components/cartComponents/cartItemDetails";

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const { cart } = useCartStore();
  const cartLength = Object.keys(cart).length;

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
      return total + item.totalPrice;
    }, 0);
    setTotalAmount(amount);
    setIsClient(true);
  }, [cart]);

  if (!isClient) {
    return null;
  }

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="flex cart:flex-col w-11/12 h-screen">
          <div className="p-4 cart:p-1 w-full cart:pb-10">
            <div className="flex flex-col gap-2 p-2">
              <div className="text-2xl font-semibold p-1">Your Cart Items</div>
              {cartLength === 0 ? (
                <div>Your cart is empty</div>
              ) : (
                Object.entries(cart).map(([itemKey, itemValue]) => (
                  <CartItem itemKey={itemKey} itemValue={itemValue} />
                ))
              )}
            </div>
          </div>
          <div className="border-l cart:border-l-0 cart:border-t border-slate-200 pt-14 p-4 cart:w-full w-4/5 cart:p-1 cart:pt-4">
            <div className="p-2 border border-slate-300 rounded-lg">
              <div>
                {Object.entries(cart).map(([key, value]) => (
                  <CartItemDetails key={key} value={value} />
                ))}
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <p className="font-semibold">Total Amount :</p>
                {totalAmount} Rs
              </div>
              {cartLength ? (
                <div className="w-full flex justify-end mt-5">
                  {" "}
                  <button
                    onClick={() => paymentOption("payment")}
                    className=" bg-black text-white text-base font-semibold w-[200px] hover:bg-gray-700 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1"
                  >
                    Proceed to checkout
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
