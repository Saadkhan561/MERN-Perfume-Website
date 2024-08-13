import Login from "@/components/register/login";
import SignUp from "@/components/register/sigup";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const router = useRouter();

  const login = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* MAIN DIV FOR FULL SCREEN */}
      <div className="relative w-4/5 h-[500px] rounded-md shadow-2xl bg-slate-100 register_small_div:hidden">
        <div className="flex">
          {/* LOGIN DIV */}
          <Login />
          {/* SIGNUP DIV */}
          <SignUp />
        </div>
        <div
          className={
            eval(router.query.login)
              ? "absolute top-0 left-0 h-full z-10 w-1/2 rounded-md bg-gray-900 text-white translate-x-full duration-500 flex justify-center items-center text-xl font-semibold"
              : "absolute top-0 left-0 h-full z-10 w-1/2 rounded-md bg-gray-900 text-white translate-x-0 duration-500 flex justify-center items-center text-xl font-semibold"
          }
        >
          {eval(!router.query.login) ? (
            <div
              onClick={() => login("login")}
              className="flex gap-2 flex-wrap cursor-pointer"
            >
              <div>Already have an account? Login</div>
              <img
                src="/images/white-right-arrow.png"
                alt=""
                height={30}
                width={30}
              />
            </div>
          ) : (
            <div
              onClick={() => login("login")}
              className="flex gap-2 cursor-pointer"
            >
              <img
                className="rotate-180"
                src="/images/white-right-arrow.png"
                alt=""
                height={30}
                width={30}
              />
              <div>Don't have an account? Sign Up</div>
            </div>
          )}
        </div>
      </div>
      {/* MAIN DIV FOR SMALL SCREEN */}
      <div className="w-4/5 register_small_div:w-3/5 register_mini_div:w-4/5 h-[500px] rounded-md shadow-2xl bg-slate-100 register_full_div:hidden">
        {eval(router.query.login) ? (
          /* LOGIN DIV */
          <div>
            <Login />
          </div>
        ) : (
          /* SIGNUP DIV */
          <div>
            <SignUp />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
