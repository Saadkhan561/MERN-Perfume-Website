import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React from "react";
import { useRouter } from "next/router";
import PaymentOption from "@/components/paymentOption";
import SideBar from "@/components/common/side-bar";
import { withProtectedWrapper } from "@/components/Protected Route/protectedRoute";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="w-full relative overflow-x-hidden font-sans">
      <div
        className={
          Boolean(router.query.sideBar) || Boolean(router.query.payment)
            ? "flex flex-col justify-center min-h-screen relative opacity-25 duration-200"
            : "flex flex-col justify-center min-h-screen relative duration-20"
        }
      >
        <div className="flex flex-col items-center border-b  border-b-slate-300 bg-white fixed top-0 left-0 z-10 w-full h-20">
          <Navbar />
          <div className="flex justify-center border-2 bg-white w-4/5 h-max border-b  border-b-slate-300">
            <ul className="flex items-center gap-4 text-lg ">
              <Link
                className="hover:border-b border-slate-500 duration-100"
                href="/"
              >
                Home
              </Link>
              <Link
                className="hover:border-b border-slate-500 duration-100"
                href="/categories"
              >
                Categories
              </Link>
            </ul>
          </div>
        </div>
        <div
          className={
            router.query.payment
              ? "opacity-50 duration-200 flex justify-center mt-28"
              : "flex justify-center mt-20 border-2 border-green-500"
          }
        >
          {children}
        </div>
        <Footer />
      </div>

      {/* DIVS THAT WILL BE DISPLAYING OVER LAYOUT */}
      {router.query.payment && (
        <div className="absolute top-0">
          <PaymentOption />
        </div>
      )}
      <SideBar />
    </div>
  );
};

export default Layout;
