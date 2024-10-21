import { useRouter } from "next/router";
import { React, useState, useEffect } from "react";
import { usePlaceOrder, useSignupMutation } from "@/hooks/mutation";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";

// FORM IMPORTS
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CartItemDetails from "@/components/cartComponents/cartItemDetails";
import Layout from "@/layout/layout";
import { House, Mail, MapPinHouse, Phone, User } from "lucide-react";
import { deliverySchema, guestDeliverySchema } from "@/schema/orderSchema";
import { MoonLoader } from "react-spinners";

const Checkout = () => {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();
  const { currentUser } = useUserStore();
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(currentUser);

  useEffect(() => {
    const amount = Object.values(cart).reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
    setTotalAmount(amount);
  }, [cart]);

  // MUTATION TO CREATE USER ACCOUNT
  const { mutate: user, isPending: isUserPending } = useSignupMutation({
    onSuccess(data) {
      console.log(data);
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
      const customer_id = data.user._id;
      const formValues = getValues();
      const newOrder = {
        customer: customer_id,
        products: resultArray,
        totalAmount: totalAmount,
        shippingAddress: { city: formValues.city, address: formValues.address },
      };
      placeOrder(newOrder);
    },
    onError(error) {
      console.log(error);
      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    },
  });

  const { mutate: placeOrder, isPending: isOrderPending } = usePlaceOrder({
    onSuccess(data) {
      console.log(data);
      reset();
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
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    city: "",
    address: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    values: initialValues,
    resolver: yupResolver(deliverySchema),
  });

  const onSubmit = (data) => {
    if (currentUser) {
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
    } else {
      const { city, address, ...updatedUser } = data;
      updatedUser["isGuest"] = true;
      user(updatedUser);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" rounded-lg p-8 h-screen w-11/12"
        >
          <div className="grid grid-cols-2 gap-8 p-4">
            <div>
              <div className="text-3xl text-center mb-6 font-semibold">
                Delivery Details
              </div>
              <div
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-rows-2 gap-2"
              >
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-sm  register_mini_div:text-xs  text-slate-500"
                      htmlFor="first_name"
                    >
                      Enter first name
                    </label>
                    <div className="flex gap-1 items-center border rounded-lg p-2 border-b-slate-300">
                      <input
                        className="cart_input_field"
                        type="text"
                        id="first_name"
                        placeholder="First name"
                        {...register("first_name")}
                      />
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.first_name && (
                      <p className="text-red-500 text-xs">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      className="text-sm  register_mini_div:text-xs  text-slate-500"
                      htmlFor="last_name"
                    >
                      Enter last name
                    </label>
                    <div className="flex gap-1 items-center border p-2 rounded-lg border-b-slate-300">
                      <input
                        className="cart_input_field"
                        type="text"
                        id="last_name"
                        placeholder="Last name"
                        {...register("last_name")}
                      />
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    {errors.last_name && (
                      <p className="text-red-500 text-xs">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm register_mini_div:text-xs text-slate-500"
                    htmlFor="email"
                  >
                    Enter your email
                  </label>
                  <div className="flex gap-1 items-center border p-2 rounded-lg border-b-slate-300">
                    <input
                      className="cart_input_field"
                      type="email"
                      id="email"
                      placeholder="Enter email"
                      {...register("email")}
                    />
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm  register_mini_div:text-xs text-slate-500"
                    htmlFor="ph_no"
                  >
                    Enter Phone No.
                  </label>
                  <div className="flex gap-1 items-center border p-2 rounded-lg border-b-slate-300">
                    <input
                      className="cart_input_field"
                      type="number"
                      id="ph_no"
                      placeholder="Enter phone no."
                      {...register("phone")}
                      onChange={(e) => e.preventDefault()}
                    />
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm register_mini_div:text-xs text-slate-500"
                    htmlFor="address"
                  >
                    Enter your address
                  </label>
                  <div className="flex gap-1 items-center border p-2 rounded-lg border-b-slate-300">
                    <input
                      className="cart_input_field"
                      type="text"
                      placeholder="Enter address"
                      {...register("address")}
                    />
                    <MapPinHouse className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-xs">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label
                    className="text-sm register_mini_div:text-xs text-slate-500"
                    htmlFor="address"
                  >
                    Enter your city
                  </label>
                  <div className="flex gap-1 items-center border p-2 rounded-lg border-b-slate-300">
                    <input
                      className="cart_input_field"
                      type="text"
                      placeholder="Enter address"
                      {...register("city")}
                    />
                    <House className="h-4 w-4 text-gray-400" />
                  </div>
                  {errors.city && (
                    <p className="text-red-500 text-xs">
                      {errors.city.message}
                    </p>
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
                <button
                  type="submit"
                  disabled={isOrderPending || isUserPending}
                  className=" bg-black text-white text-base w-full font-semibold  hover:bg-gray-700 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1"
                >
                  {isOrderPending || isUserPending ? (
                    <MoonLoader size={15} color="white" />
                  ) : (
                    "Place Order"
                  )}
                </button>
                <div
                  onClick={() => router.push("/cart")}
                  type="button"
                  className=" bg-red-500 text-white text-base w-full font-semibold  hover:bg-red-600 hover:cursor-pointer duration-200 flex justify-center mob_display:text-sm p-1"
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
