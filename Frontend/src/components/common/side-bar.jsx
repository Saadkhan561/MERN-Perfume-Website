import useUserStore from "@/store/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideBar = () => {
  const router = useRouter();
  const sideBar = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const { currentUser, deleteUserInfo } = useUserStore();
  const first_name = currentUser?.user.first_name;
  const last_name = currentUser?.user.last_name;

  return (
    <div>
      {/* SIDE BAR DIV */}
      <div
        className={
          Boolean(router.query.sideBar)
            ? "fixed top-0 right-0 duration-300 h-screen bg-white w-[200px] z-20 shadow-2xl"
            : "fixed top-0 -right-full duration-200 h-screen bg-white w-[200px] z-20 shadow-2xl"
        }
      >
        <ul className="p-2">
          <li className="flex justify-end p-2">
            {" "}
            <ArrowRight
              onClick={() => sideBar("sideBar")}
              className="h-4 w-4 cursor-pointer"
            />
          </li>
          <li className="flex justify-between items-center p-2 pb-4">
            <div className="p-2 rounded-full bg-slate-800 text-white text-xs">
              {`${first_name?.split("")[0]}${last_name?.split("")[0]}`}
            </div>
            {currentUser === null ? (
              <div className="text-sm font-semibold cursor-pointer flex gap-1">
                <Link className="hover:underline" href={"/register?login=true"}>
                  LogIn
                </Link>
                /
                <Link className="hover:underline" href={"/register"}>
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="font-semibold text-sm">{`${currentUser?.user.first_name} ${currentUser?.user.last_name} `}</div>
              </div>
            )}
          </li>
          <hr />
          <li
            onClick={() => router.push("/")}
            className="p-2 mt-4 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white"
          >
            Home
          </li>
          <li className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white">
            Brands
          </li>
          <li
            onClick={() => router.push("/products")}
            className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white"
          >
            Products
          </li>
          <li
            onClick={() => router.push("/cart")}
            className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white"
          >
            Cart
          </li>
          {currentUser && (
            <li
              onClick={deleteUserInfo}
              className="p-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-500 hover:text-white duration-200"
            >
              Logout
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
