import React from "react";
import { DialogContent } from "../ui/dialog";
import { useFetchProductImages, useGetUserOrderById } from "@/hooks/query";
import { useRouter } from "next/router";
import { Timer, Truck } from "lucide-react";
import OrderItemCard from "../cards/orderItemCard";

const OrderDetail = ({ clearQueryParam }) => {
  const orderId = useRouter().query.orderId;
  const { data: order, isLoading } = useGetUserOrderById(
    orderId && {
      orderId: orderId,
    }
  );

  const orderDate = new Date(order && order[0]?.createdAt);
  orderDate.setDate(orderDate.getDate() + 7);

  return (
    <DialogContent className="bg-white p-8 font-sans md:pt-14 pt-10 w-[90%] lg:h-4/5 h-[90%] rounded-lg sm:w-3/5">
      {order && (
        <div className="flex flex-col gap-4 h-4/5">
          <div className="flex justify-between md:flex-row flex-col items-start gap-2 md:items-center">
            <div>
              <p className="text-gray-500 md:text-sm text-xs">Order Id</p>
              <p className="font-semibold md:text-base text-sm">
                #{order[0]?._id}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-gray-500 font-semibold md:text-base text-sm">
                Order Status:{" "}
              </p>
              <span
                className={`border rounded-lg md:text-base text-sm p-1 text-center ${
                  order[0]?.orderStatus === "completed"
                    ? "border-green-600 text-green-500"
                    : order[0]?.orderStatus === "cancelled"
                    ? "border-red-600 text-red-500"
                    : "border-yellow-500 text-yellow-500"
                }`}
              >
                {" "}
                {order[0]?.orderStatus}
              </span>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-2">
            <div className="p-2 rounded-lg flex flex-col gap-2 bg-slate-100 w-full">
              <p className="md:text-2xl font-semibold">Delivery Details: </p>
              <p className="font-semibold md:text-base text-sm">
                Address:{" "}
                <span className="font-normal md:text-sm text-xs">
                  {order[0].shippingAddress.address}
                </span>
              </p>
              <p className="font-semibold md:text-base text-sm">
                City:{" "}
                <span className="font-normal md:text-sm text-xs">
                  {order[0].shippingAddress.city}
                </span>
              </p>
            </div>
            <div className="flex gap-2 lg:flex-col flex-row w-full">
              <div className="bg-slate-100 rounded-lg p-2 w-full">
                <Truck size={20} />
                <p className="font-semibold tex-sm sm:text-base">
                  Estimated Arrival Date :
                </p>
                <p>{orderDate.toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-2 w-full">
                <Timer size={20} />
                <p className="font-semibold tex-sm sm:text-base">
                  Delivered In :
                </p>
                <p>5 - 7 Days</p>
              </div>
            </div>
          </div>
          <p className="text-lg font-semibold">Cart Items :</p>
          <div className="flex gap-2 md:flex-wrap md:flex-row flex-col  bg-slate-100 p-2 h-[420px] sm:h-[400px] lg:h-[340px] rounded-lg overflow-y-auto">
            {order[0]?.products?.map((product, index) => (
              <OrderItemCard
                key={index}
                category={product.category_name}
                productName={product.name}
                product={product}
              />
            ))}
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default OrderDetail;
