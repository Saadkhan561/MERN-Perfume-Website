import { useResetPassword } from "@/hooks/mutation";
import { resetPasswordSchema } from "@/schema/resetPasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetPassword = () => {
  const [passHidden, setPassHidden] = useState(true);
  const router = useRouter();
  const token = router.query.resetToken;
  console.log(token);

  const initialValues = {
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: initialValues,
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    data["token"] = token && token;
    console.log(token);
    resetPassword(data);
  };

  const { mutate: resetPassword, isPending: isSetPasswordPending } =
    useResetPassword({
      onSuccess(data) {
        console.log(data);
        toast.success("Password set");
        toast.success(data.message);
        reset();
        router.push("/register?login=true");
      },
      onError(err) {
        console.log(err);
        toast.error(err.error);
      },
    });

  return (
    <div className="w-full h-screen flex items-center justify-center font-sans">
      <ToastContainer
        position="top-center"
        transition={Bounce}
        autoClose={1000}
        hideProgressBar={true}
      />
      <div className="w-1/4 rounded-lg shadow-2xl p-4 flex flex-col gap-4">
        <p className="text-2xl font-semibold">Set your password</p>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label
              className="text-sm  register_mini_div:text-xs text-slate-500"
              htmlFor="password"
            >
              Enter your password
            </label>
            <div className="flex gap-1 items-center border rounded-lg p-2 border-b-slate-300">
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
          <button
            disabled={isSetPasswordPending}
            className="p-1 rounded-lg  bg-black text-white text-center font-semibold"
          >
            {isSetPasswordPending ? (
              <div className="flex justify-center">
                <MoonLoader size={15} color="white" />
              </div>
            ) : (
              "Set password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
