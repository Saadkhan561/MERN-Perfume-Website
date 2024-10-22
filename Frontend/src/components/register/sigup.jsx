import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "@/hooks/mutation";
import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import { MoonLoader } from "react-spinners";
import { signupSchema } from "@/schema/registerSchema";

const SignUp = () => {
  const [passHidden, setPassHidden] = useState(true);

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: initialValues,
    resolver: yupResolver(signupSchema),
  });

  // MUTATION HOOK
  const router = useRouter();
  const { mutate: user, isPending: isSignupPending } = useSignupMutation({
    onSuccess(data) {
      console.log(data);
      toast.success(data.message);
      router.push("register?login=true");
    },
    onError(error) {
      console.log(error);
      toast.error(error);
    },
  });

  const onSubmit = (data) => {
    user(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 register_small_div:w-full pt-10">
      <div className="text-3xl font-semibold register_mini_div:text-2xl">
        Sign Up
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-4/5 pt-5 flex flex-col ${Object.keys(errors).length !== 0 ? "gap-3":"gap-5"}`}
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-sm  register_mini_div:text-xs  text-slate-500"
            htmlFor="first_name"
          >
            Enter first name
          </label>
          <div className="flex gap-1 items-center border-b border-b-slate-300">
            <input
              className="input_field"
              type="text"
              id="first_name"
              {...register("first_name")}
            />
            <User className="h-4 w-4 text-gray-400" />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-xs">{errors.first_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm  register_mini_div:text-xs  text-slate-500"
            htmlFor="last_name"
          >
            Enter last name
          </label>
          <div className="flex gap-1 items-center border-b border-b-slate-300">
            <input
              className="input_field"
              type="text"
              id="last_name"
              {...register("last_name")}
            />
            <User className="h-4 w-4 text-gray-400" />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-xs">{errors.last_name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm  register_mini_div:text-xs text-slate-500"
            htmlFor="email"
          >
            Enter your email
          </label>
          <div className="flex gap-1 items-center border-b border-b-slate-300">
            <input
              className="input_field"
              type="email"
              id="email"
              {...register("email")}
            />
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm  register_mini_div:text-xs text-slate-500"
            htmlFor="password"
          >
            Enter your password
          </label>
          <div className="flex gap-1 items-center border-b border-b-slate-300">
            {passHidden ? (
              <input
                className="input_field"
                type="password"
                id="password"
                {...register("password")}
              />
            ) : (
              <input
                className="input_field"
                type="text"
                id="password"
                {...register("password")}
              />
            )}
            {passHidden ? (
              <Eye
                className="h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => setPassHidden(!passHidden)}
              />
            ) : (
              <EyeOff
                className="h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => setPassHidden(!passHidden)}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm  register_mini_div:text-xs text-slate-500"
            htmlFor="ph_no"
          >
            Enter Phone No.
          </label>
          <div className="flex gap-1 items-center border-b border-b-slate-300">
            <input
              className="input_field"
              type="number"
              id="ph_no"
              {...register("phone")}
              onChange={(e) => e.preventDefault()}
            />
            <Phone className="h-4 w-4 text-gray-400" />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>
        <div className="text-end">
          <button
            className="font-semibold bg-gray-900 w-40 text-white p-1 px-2 rounded-md"
            type="submit"
            disabled={isSignupPending}
          >
            {isSignupPending ? (
              <MoonLoader className="w-full text-center" size={15} color="white" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      <div className="text-sm mt-4">
        <p>
          Already have an account?{" "}
          <a
            className="underline text-blue-500 cursor-pointer"
            href="register?login=true"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
