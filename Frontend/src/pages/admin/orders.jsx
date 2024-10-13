import React, { useState } from "react";
import AdminLayout from "./layout";
import {
  ChevronDown,
  ChevronLeft,
  Ellipsis,
  Filter,
  Search,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchOrders } from "@/hooks/query";
import { ClipLoader } from "react-spinners";

const Orders = () => {
  const [searchVal, setSearchVal] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusId, setStatusId] = useState(null);

  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState("");

  const orderStatus = ["completed", "pending", "cancelled"];

  const { data: orders, isLoading: isOrdersLoading } = useFetchOrders({
    searchTerm: query,
    skip: skip,
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuery(searchVal);
      setSkip(0);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 bg-slate-200 h-[90%] ">
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
                      onKeyDown={handleKeyPress}
                    />
                  </form>
                </div>
              </div>
              {/* FILTER DIV */}
              {/* <div>
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
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
          <div className="p-4 relative">
            <Table className="relative">
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Shipping address</TableHead>
                  <TableHead>Order status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.orders?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center p-4 text-lg">
                      No orders are placed yet....
                    </TableCell>
                  </TableRow>
                ) : isOrdersLoading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center p-4 text-lg">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  orders?.orders?.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">
                        {order._id}
                      </TableCell>
                      <TableCell>
                        {order.products.map((product, index) => (
                          <p key={index}>
                            {product.product} ({product.option} ml) x{" "}
                            {product.quantity}
                          </p>
                        ))}
                      </TableCell>
                      <TableCell>
                        {order.customerDetails.first_name}{" "}
                        {order.customerDetails.last_name}
                      </TableCell>
                      <TableCell>
                        {order.shippingAddress.address} -{" "}
                        {order.shippingAddress.city}
                      </TableCell>
                      <TableCell className='flex items-center gap-4'>
                        <div
                          className={`p-1 relative border text-center justify-center w-24 rounded-lg cursor-pointer text-white ${
                            order.orderStatus === "completed"
                              ? "border-green-600 text-green-600"
                              : order.orderStatus === "cancelled"
                              ? "border-red-600 text-red-600"
                              : "border-yellow-500 text-yellow-500"
                          }`}
                        >
                          <p>{order?.orderStatus}</p>
                          {status && index === statusId && (
                            <ul className="absolute top-0 right-24 bg-white z-10 w-24 p-2 shadow-2xl border text-white ">
                              {orderStatus.map((status, index) =>
                                order.orderStatus !== status ? (
                                  <li
                                    className={`p-1 mb-1 border cursor-pointer text-center rounded-lg duration-200 ${
                                      status === "completed"
                                        ? "border-green-600 text-green-600"
                                        : status === "cancelled"
                                        ? "border-red-600 text-red-600"
                                        : "border-yellow-500 text-yellow-500"
                                    }`}
                                    key={index}
                                  >
                                    {status}
                                  </li>
                                ) : (
                                  ""
                                )
                              )}
                            </ul>
                          )}
                        </div>
                        <Ellipsis
                          onClick={() => {
                            setStatus(!status);
                            setStatusId(index);
                          }}
                          className="h-3 w-3 cursor-pointer text-gray-500"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            <div className="flex gap-2 mt-10 font-semibold">
              <div>Page No:</div>
              <div className="flex gap-2 items-center">
                <ChevronLeft
                  onClick={() => {
                    if (skip > 0) {
                      setSkip(skip - 2);
                    }
                  }}
                  className=" border border-slate-300 cursor-pointer hover:bg-slate-200 duration-200 h-5 w-5"
                />
                <p className="text-sm font-semibold">
                  {isOrdersLoading ? (
                    <ClipLoader size={15} />
                  ) : orders?.orders?.length === 0 ? (
                    "0"
                  ) : (
                    `${orders?.currentPage} / ${orders?.totalPages}`
                  )}
                </p>
                <ChevronLeft
                  onClick={() => {
                    if (orders.currentPage < orders.totalPages) {
                      setSkip(skip + 2);
                    }
                  }}
                  className=" border border-slate-300 cursor-pointer hover:bg-slate-200 duration-200 h-5 w-5 rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
