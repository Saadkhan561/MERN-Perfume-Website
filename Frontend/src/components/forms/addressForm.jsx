import { useAddAddress } from "@/hooks/mutation";
import { addressFormSchema } from "@/schema/addressFormSchema";
import useUserStore from "@/store/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { House, MapPinHouse, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";

const AddressForm = ({ setAddressForm, addressForm }) => {
  const { currentUser, addUserAddress } = useUserStore();
  const { mutate: saveAddress, isPending: isSaveAddressPending } =
    useAddAddress({
      onSuccess(data) {
        console.log(data);
        reset();
        setAddressForm(!addressForm);
        addUserAddress(data.userAddress);
      },
      onError(err) {
        console.log(err);
      },
    });

  const initialValues = {
    address: "",
    city: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: initialValues,
    resolver: yupResolver(addressFormSchema),
  });

  const onSubmit = (data) => {
    data["userId"] = currentUser?.user._id;
    console.log(data);
    saveAddress(data);
  };

  return (
    <div className="p-4 flex flex-col gap-2 border border-slate-300 rounded-lg w-[400px]">
      <div className="flex justify-between items-center">
        <p className="text-xl">Enter address details</p>
        <X className="cursor-pointer" size={15} onClick={() => setAddressForm(!addressForm)} />
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500">Enter your complete current address</label>
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
            <p className="text-red-500 text-xs">{errors.address.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-500">Enter your city</label>
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
            <p className="text-red-500 text-xs">{errors.city.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`p-1 rounded-lg text-white bg-black ${
            isSaveAddressPending ? "opacity-50 duration-200 cursor-none}" : ""
          }`}
        >
          {isSaveAddressPending ? (
            <div className="flex justify-center"><MoonLoader size={15} color="white" /></div>
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
