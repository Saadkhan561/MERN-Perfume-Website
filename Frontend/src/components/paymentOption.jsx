import { useRouter } from "next/router";
import { React, useState, useEffect } from "react";
import { usePaymentHook, usePlaceOrder } from "@/hooks/mutation";
import { loadStripe } from "@stripe/stripe-js";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";

const PaymentOption = () => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = Object.values(cart).reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  const { mutate: payment } = usePaymentHook({
    onSuccess: async (data) => {
      const stripe = await loadStripe(
        "pk_test_51PJwoeISVl2eCOfi889RKDeGaatWGUuEtsJ5gUYFxPzro603EcLAo9QcVMqPS9JpKYfuSmbB8WOA65GTXKHNSUK600RxheWupQ"
      );
      console.log(data);
      const result = stripe.redirectToCheckout({
        sessionId: data.id,
      });
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const { mutate: placeOrder } = usePlaceOrder({
    onSuccess(data) {
      console.log(data);
      clearCart()
      setTimeout(() => {
        router.push("/success");
      }, 2000);
    },
    onError(data) {
      console.log(data);
    },
  });

  const { mutate: placeOrderPayOnline } = usePlaceOrder({
    onSuccess(data) {
      console.log(data);
      clearCart()
    },
    onError(data) {
      console.log(data);
    },
  });
  
  const { currentUser } = useUserStore();
  const customer_id = currentUser.user._id;

  const makePayment = async () => {
    const resultArray = Object.entries(cart).map(([itemKey, value]) => {
      return {
        product: itemKey,
        size: value.size,
        quantity: value.quantity

      };
    });
    const newOrder = {
      customer: customer_id,
      products: resultArray,
      totalAmount: totalAmount,
    };
    placeOrderPayOnline(newOrder);
    payment(cart);
  };

  const placeNewOrder = () => {
    const resultArray = Object.entries(cart).map(([itemKey, value]) => {
      return {
        product: itemKey,
        size: value.size,
        quantity: value.quantity

      };
    });
    const newOrder = {
      customer: customer_id,
      products: resultArray,
      totalAmount: totalAmount,
    };
    placeOrder(newOrder);
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen relative">
      <div className="bg-white shadow-2xl w-[400px] h-[300px] border border-slate-100 p-1 pl-8 pr-8 flex flex-col justify-center gap-6">
        <div className="flex justify-end">
          <img
            onClick={() => router.push("cart")}
            className="cursor-pointer"
            src="/images/cross.png"
            alt=""
            height={15}
            width={15}
          />
        </div>
        <div className="text-lg font-semibold ">Choose payment option</div>
        <div
          onClick={placeNewOrder}
          className="flex justify-between items-center text-green-600 font-semibold border border-green-600 cursor-pointer hover:bg-slate-100 duration-200 rounded-full p-2"
        >
          <div>Cash on delivery</div>
          <div>
            <img src="/images/cash.png" alt="" height={20} width={20} />
          </div>
        </div>
        <div
          onClick={makePayment}
          className="flex justify-between items-center text-green-600 font-semibold border border-green-600 cursor-pointer hover:bg-slate-100 duration-200 rounded-full p-2"
        >
          <div>Pay online</div>
          <div>
            <img src="/images/payOnline.png" alt="" height={20} width={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
