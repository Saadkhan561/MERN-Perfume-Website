import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";
import { useRouter } from "next/router";
import PaymentOption from "@/components/paymentOption";
import { ArrowRight } from "lucide-react";

const Layout = ({ children }) => {
  const router = useRouter();
  const paymentOptionDiv = () => {
    if (router.query.payment) {
      return <PaymentOption />;
    }
  };
  return (
    <div className="w-full relative">
      <div className={Boolean(router.query.sideBar) ? "flex flex-col justify-center min-h-screen relative overflow-x-hidden opacity-25 duration-200":"flex flex-col justify-center min-h-screen relative overflow-x-hidden duration-20"}>
        <div className="flex justify-center bg-gray-900 fixed top-0 left-0 z-10 w-full">
          <Navbar />
        </div>
        <div
          className={
            router.query.payment
              ? "opacity-50 duration-200 flex justify-center"
              : "flex justify-center"
          }
        >
          {children}
        </div>
        {/* <div className="absolute top-0">{paymentOptionDiv()}</div> */}
        <Footer />
      </div>
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
              onClick={() => router.push({ pathname: "/" })}
              className="h-4 w-4 cursor-pointer"
            />
          </li>
          <li className="flex justify-between items-center p-2 pb-4">
            <div className="p-2 rounded-full bg-slate-800 text-white text-xs">
              SK
            </div>
            <div className="font-semibold">Saad Khan</div>
          </li>
          <hr />
          <li className="p-2 mt-4 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white">
            Home
          </li>
          <li className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white">
            Brands
          </li>
          <li className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white">
            Products
          </li>
          <li className="p-2 rounded-lg cursor-pointer hover:bg-slate-800 duration-200 hover:text-white">
            Cart
          </li>
          <li className="p-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-500 hover:text-white duration-200">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
