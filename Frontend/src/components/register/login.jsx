import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "@/hooks/mutation";
import { useRouter } from "next/router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import useUserStore from "@/store/user";

const Login = () => {
  const [passHidden, setPassHidden] = useState(true);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: initialValues,
    resolver: yupResolver(loginSchema),
  });

  // MUTATION HOOK
  const router = useRouter();
  const {addUserInfo} = useUserStore()
  const { mutate: user } = useLoginMutation({
    onSuccess(data) {
      addUserInfo(data)
      toast.success("Logged In", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      reset()
      setTimeout(() => {
        router.push("/");
      }, 2000);
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
        transition: Bounce,
      });
    },
  });

  const onSubmit = (data) => {
    console.log(data)
    user(data);
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 register_small_div:w-full pt-10">
      <ToastContainer />;
      <div className="text-3xl font-semibold register_mini_div:text-2xl">
        Login
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 pt-5 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label
            className="text-sm register_mini_div:text-xs  text-slate-500"
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
            <img src="/images/account_sm.png" alt="" height={20} width={20} />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-sm register_mini_div:text-xs text-slate-500"
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
              <img
                className="cursor-pointer"
                onClick={() => setPassHidden(!passHidden)}
                src="/images/pass_eye.png"
                alt=""
                height={20}
                width={20}
              />
            ) : (
              <img
                className="cursor-pointer"
                onClick={() => setPassHidden(!passHidden)}
                src="/images/pass_eye_hidden.png"
                alt=""
                height={20}
                width={20}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
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
          Don't have an account?{" "}
          <a className="underline text-blue-500 cursor-pointer" href="register">
            Signup
          </a>
        </p>
      </div>
      {/* <div onClick={() => signIn()}><button>Login with google</button></div> */}
    </div>
  );
};

export default Login;
