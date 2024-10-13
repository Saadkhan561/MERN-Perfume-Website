"use client";

import useUserStore from "@/store/user";
import { LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Sidebar = () => {
  const { deleteUserInfo } = useUserStore();
  const router = useRouter();
  const [active, setActive] = useState("/");

  const handleLogout = () => {
    deleteUserInfo();
  };
  return (
    <aside className="duration-300 p-6 bg-slate-900 text-white w-[250px] sm:block hidden h-full border-r border-r-slate-300 relative">
      <div className="text-center mb-10 text-3xl w-full">
        <p>Perfume Store</p>
      </div>
      <ul className="p-2">
        <Link href={"/admin"}>
          <li
            className={`sidebar_li   ${
              active == "dashboard"
                ? "bg-slate-700 border  border-slate-800 text-white"
                : ""
            }`}
            onClick={() => setActive("dashboard")}
          >
            <LayoutDashboard className="h-5 w-5" />
            <p>Dashboard</p>
          </li>
        </Link>
        <Link href={"/admin/products"}>
          <li
            className={`sidebar_li   ${
              active == "products"
                ? "bg-slate-700 border  border-slate-800 text-white"
                : ""
            }`}
            onClick={() => setActive("products")}
          >
            <LayoutDashboard className="h-5 w-5" />
            <p>Products</p>
          </li>
        </Link>
        <Link href={"/admin/orders"}>
          <li
            className={`sidebar_li   ${
              active == "products"
                ? "bg-slate-700 border  border-slate-800 text-white"
                : ""
            }`}
            onClick={() => setActive("products")}
          >
            <ShoppingCart className="h-5 w-5" />
            <p>Orders</p>
          </li>
        </Link>
        <div onClick={handleLogout} className="sidebar_li bg-red-500">
          <LogOut className="h-4 w-4" />
          Logout
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
