import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignupMutation } from "@/hooks/mutation";
import { useRouter } from "next/router";

import { Bounce, Slide, toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";

const SignUp = () => {
  const [passHidden, setPassHidden] = useState(true);

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
  };

  const signupSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    password: yup
      .string()
      .min(8, "Password must be atleast 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    phone: yup
      .string()
      .matches(/^\+?[\d\s\-()]{10,15}$/, "Phone number is not valid")
      .required("Phone number is required"),
  });

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
  const { mutate: user } = useSignupMutation({
    onSuccess(data) {
      console.log(data);
      toast.success("Account Created", {
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
      router.push("register?login=true");
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

  const onSubmit = (data) => {
    user(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 register_small_div:w-full pt-10">
      <ToastContainer />
      <div className="text-3xl font-semibold register_mini_div:text-2xl">
        Sign Up
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 pt-5 flex flex-col gap-5"
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
            className="font-semibold bg-gray-900 text-white p-1 pl-2 pr-2 rounded-md"
            type="submit"
          >
            Submit
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
