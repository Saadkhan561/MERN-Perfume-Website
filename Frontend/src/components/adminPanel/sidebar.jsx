"use client";

import useUserStore from "@/store/user";
import { LayoutDashboard, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const { deleteUserInfo } = useUserStore();

  const handleLogout = () => {
    deleteUserInfo();
  };

  const pathName = usePathname().split("/");

  return (
    <aside className="duration-300 p-6  w-[250px] sm:block hidden h-full border-r border-r-slate-300 relative">
      <div className="text-center mb-10 text-3xl w-full">
        <p>Perfume Store</p>
      </div>
      <ul className="p-2">
        <Link href={"/admin"}>
          <li
            className={`sidebar_li   ${
              pathName.includes("admin") && pathName.length === 2
                ? "text-blue-600"
                : ""
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <p>Dashboard</p>
          </li>
        </Link>
        <Link href={"/admin/products"}>
          <li
            className={`sidebar_li   ${
              pathName.includes("admin") && pathName.includes("products")
                ? "text-blue-600"
                : ""
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <p>Products</p>
          </li>
        </Link>
        <Link href={"/admin/orders"}>
          <li
            className={`sidebar_li   ${
              pathName.includes("admin") && pathName.includes("orders")
                ? "text-blue-600"
                : ""
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <p>Orders</p>
          </li>
        </Link>
        <div onClick={handleLogout} className="sidebar_li text-red-500">
          <LogOut className="h-4 w-4" />
          Logout
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;
