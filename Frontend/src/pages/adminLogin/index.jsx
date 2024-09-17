import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useUserStore from '@/store/user';
import { useLoginMutation } from '@/hooks/mutation';
import { useRouter } from "next/router";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
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
    const router = useRouter()
    const { addUserInfo } = useUserStore()
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
                router.push("/admin");
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
        <div className='flex justify-center items-center h-screen w-screen'>
            <ToastContainer />
            <div className='flex flex-col items-center gap-4 border border-slate-300 rounded-lg shadow-2xl w-[600px] mob_display:w-4/5 h-[500px] p-4'>
                <p className='text-3xl mob_display:text-xl font-semibold'>Enter your admin credentials</p>
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
            </div>
        </div>
    )
}

export default AdminLogin