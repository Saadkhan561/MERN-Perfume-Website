import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFetchAllCategories } from "@/hooks/query";
import useCartStore from "@/store/cart";
import useUserStore from "@/store/user";
import { LogOut, Menu, Settings, ShoppingCart, User, UserRound } from "lucide-react";
import SearchDiv from "../search";
// import { Link } from "next/link";
const Navbar = () => {
  const [logOut, setLogout] = useState(false);
  const [user, setUser] = useState();
  const [accountDiv, setAccountDiv] = useState(false);
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
    router.push("/register?login=true");
  };

  const { cart } = useCartStore();

  return (
    <nav className="w-4/5 mob_display:w-11/12">
      <div className="flex justify-around items-center p-2 mob_display:hidden">
        <div>
          <SearchDiv />
        </div>
        <div className="text-3xl font-didot">Perfume Shop</div>
        <div>
          <ul className="flex items-center gap-6 p-1 text-lg">
            <li>
              <Link href={"/cart"} className="relative">
                <div className="absolute -top-2 -right-2 font-semibold border bg-black text-white p-1 text-center rounded-full text-xs">
                  {Object.keys(cart).length}
                </div>
                <div className="rounded-t-3xl border border-slate-500 p-2 pt-3 cursor-pointer">
                  <ShoppingCart className="h-4 w-4" />
                </div>
              </Link>
            </li>
            {currentUser ? (
              <li className="relative">
                <ul
                  className={
                    accountDiv
                      ? "absolute top-12 shadow-2xl -left-5 bg-white text-sm w-[180px] p-2 flex flex-col gap-2 rounded-lg"
                      : "absolute hidden top-12 shadow-2xl -left-5 bg-white text-sm w-[180px] p-2 rounded-lg"
                  }
                >
                  <li className="p-1 text-lg font-semibold border-b border-b-slate-200">
                    {currentUser.user.first_name + " " + currentUser.user.last_name}
                  </li>
                  <li
                    onClick={() => router.push("/account")}
                    className="cursor-pointer text-black flex gap-2 items-center hover:bg-slate-100 duration-200 p-1 rounded-lg border-b border-b-slate-200"
                  >
                    <User size={15} />My Account
                  </li>
                  <li
                    onClick={() => router.push("/settings")}
                    className="cursor-pointer text-black flex gap-2 items-center hover:bg-slate-100 duration-200 p-1 rounded-lg border-b border-b-slate-200"
                  >
                    <Settings size={15} />Settings
                  </li>
                  <li
                    onClick={logout}
                    className="cursor-pointer text-red-500 flex items-center gap-2 hover:bg-slate-100  duration-200 p-1 rounded-lg"
                  >
                    <LogOut  size={15}/>Logout
                  </li>
                </ul>
                <div
                  onClick={() => setAccountDiv(!accountDiv)}
                  className="rounded-t-3xl border border-slate-500 p-2 pt-3 cursor-pointer"
                >
                  <UserRound className="h-4 w-4" />
                </div>
              </li>
            ) : (
              <Link className="text-sm font-semibold" href="/register?login=true">Login / Sign Up</Link>
            )}
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 full_screen:hidden">
        <p className="text-3xl">Perfume Shop</p>
        <Menu
          onClick={() => sideBar("sideBar")}
          className="h-4 w-4 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
