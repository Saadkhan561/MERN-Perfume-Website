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
  console.log(order);

  return (
    <DialogContent className="bg-white p-4 font-sans pt-14">
      {order && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Order Id</p>
              <p className="font-semibold">#{order[0]?._id}</p>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-gray-500 font-semibold">Order Status: </p>
              <span
                className={`border rounded-lg p-1 text-center ${
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
              <p className="sm:text-2xl text-lg font-semibold">Delivery Details: </p>
              <p className="font-semibold">
                Address:{" "}
                <span className="font-normal">
                  {order[0].shippingAddress.address}
                </span>
              </p>
              <p className="font-semibold">
                City:{" "}
                <span className="font-normal">
                  {order[0].shippingAddress.city}
                </span>
              </p>
            </div>
            <div className="flex gap-2 w-full">
              <div className="bg-slate-100 rounded-lg p-2  lg:w-max w-full">
                <Truck size={20} />
                <p className="font-semibold tex-sm sm:text-base">Estimated Arrival Date :</p>
                <p>{orderDate.toLocaleDateString()}</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-2 lg:w-max w-full">
                <Timer size={20} />
                <p className="font-semibold tex-sm sm:text-base">Delivered In :</p>
                <p>5 - 7 Days</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 p-2 rounded-lg max-h-[500px] sm:max-h-[450px] overflow-y-auto">
            <div className="flex gap-2 flex-wrap">
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
        </div>
      )}
    </DialogContent>
  );
};

export default OrderDetail;
