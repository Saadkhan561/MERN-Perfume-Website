import React, { useState } from "react";
import AdminLayout from "./layout";
import { ChevronDown, Filter, Search } from "lucide-react";

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
  const [status, setStatus] = useState(false);
  const [statusId, setStatusId] = useState(null);

  const orderStatus = ["completed", "pending", "cancelled"];

  const { data: orders, isLoading: isOrdersLoading } = useFetchOrders();

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
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 relative">
            <Table className="relative">
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Customer name</TableHead>
                  <TableHead>Shipping address</TableHead>
                  <TableHead>Order status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.length === 0 ? (
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
                  orders?.map((order, index) => (
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
                      <TableCell>
                        <div
                          className={`p-1 relative flex items-center gap-2 justify-center w-24 rounded-lg cursor-pointer text-white ${
                            order.orderStatus === "completed"
                              ? "bg-green-600"
                              : order.orderStatus === "cancelled"
                              ? "bg-red-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          <p>
                            {order.orderStatus}
                          </p>
                          {status && index === statusId && (
                            <ul className="absolute top-0 right-24 bg-white z-10 w-24 p-2 shadow-2xl border text-white ">
                              {orderStatus.map((status, index) =>
                                order.orderStatus !== status ? (
                                  <li
                                    className={`p-1 mb-1 cursor-pointer text-center rounded-lg duration-200 ${
                                      status === "completed"
                                        ? "bg-green-600"
                                        : status === "cancelled"
                                        ? "bg-red-600"
                                        : "bg-yellow-500"
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
                          <ChevronDown
                            onClick={() => {
                              setStatus(!status);
                              setStatusId(index);
                            }}
                            className="h-3 w-3"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;
