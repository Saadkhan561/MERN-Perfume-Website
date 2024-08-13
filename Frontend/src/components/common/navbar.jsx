import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFetchAllCategories } from "@/hooks/query";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
// import { Link } from "next/link";
const Navbar = () => {
  const [logOut, setLogout] = useState(false);
  const [user, setUser] = useState();
  const router = useRouter();
  const [pathName, setPathName] = useState();

  const { currentUser, deleteUserInfo } = useUserStore();
  useEffect(() => {
    setPathName(router.pathname);
  }, [pathName]);

  const { data: categories, isLoading: isCategoryLoading } =
    useFetchAllCategories();

  const sideBar = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const products = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  const logout = () => {
    deleteUserInfo();
    router.push("register?login=true");
  };

  const { cart } = useCartStore();

  return (
    <nav className="w-11/12">
      <div className="flex justify-between items-center p-4 text-white mob_display:hidden">
        <div>
          <ul className="flex items-center gap-6 p-1">
            <li className="text-3xl">Perfume Shop</li>
            <li className="flex gap-2 items-center border border-slate-100 rounded-r-full p-2">
              <Search height={15} width={15} />
              <input
                className="focus:outline-none text-sm bg-gray-900"
                type="text"
                placeholder="Search..."
              />
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex items-center gap-6 p-1 text-lg">
            <li className="hover:underline duration-200 cursor-pointer">
              Home
            </li>
            <li className="hover:underline duration-200 cursor-pointer">
              Brands
            </li>
            <li className="hover:underline duration-200 cursor-pointer">
              Products
            </li>
            <li className="rounded-t-3xl p-2 pt-3 bg-slate-800 cursor-pointer">
              <ShoppingCart className="h-4 w-4" />
            </li>
            <li className="rounded-t-3xl p-2 pt-3 bg-slate-800 cursor-pointer">
              <UserRound className="h-4 w-4" />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 text-white full_screen:hidden">
        <p className="text-2xl">Perfume Shop</p>
        <Menu onClick={() => router.push({pathName: router.pathname,query: {sideBar: true}})} className="h-4 w-4 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
