import React, { useState } from "react";
import AdminLayout from "./layout";
import { Filter, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchOrders } from "@/hooks/query";

const Orders = () => {
  const [searchVal, setSearchVal] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);

  const { data: orders, isLoading: isOrdersLoading } = useFetchOrders();
  console.log(orders);

  return (
    <AdminLayout>
      <div className="p-4 bg-slate-200 h-full ">
        <div className="bg-white rounded-lg">
          <div className="flex items-center p-4 justify-between">
            <p className="text-xl">Orders</p>
            <div className="flex items-center gap-4">
              {/* SEARCH DIV */}
              <div>
                <div>
                  <form className="flex gap-2 items-center border border-slate-500 rounded-r-full p-1">
                    <Search
                      onClick={() => setQuery(searchVal)}
                      height={15}
                      width={15}
                    />
                    <input
                      className="focus:outline-none text-sm"
                      type="text"
                      value={searchVal}
                      placeholder="Search..."
                      onChange={(e) => setSearchVal(e.target.value)}
                      //   onKeyDown={handleKeyPress}
                    />
                  </form>
                </div>
              </div>
              <div>
                <div className="relative ">
                  <Filter
                    onClick={() => setFilterDropdown(!filterDropdown)}
                    className="h-4 w-4 cursor-pointer"
                  />
                  <ul
                    className={`p-1 z-20 absolute top-6 -left-8 w-[100px] bg-white shadow-2xl border border-slate-200 ${
                      filterDropdown ? "block" : "hidden"
                    }`}
                  >
                    <li
                      onClick={() => setFilterVal(null)}
                      className="p-1 text-sm hover:bg-slate-100 duration-200 cursor-pointer"
                    >
                      See all
                    </li>
                    {/* {isCategoriesLoading ? (
                      <div>Loading...</div>
                    ) : (
                      categories?.map((category, index) => (
                        <li
                          onClick={() => setFilterVal(category.name)}
                          className="p-1 text-sm hover:bg-slate-100 duration-200 cursor-pointer"
                          key={index}
                        >
                          {category.name}
                        </li>
                      ))
                    )} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
