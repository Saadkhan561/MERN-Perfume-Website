import React from "react";
import { DialogContent } from "../ui/dialog";
import { useFetchProductImages, useGetUserOrderById } from "@/hooks/query";
import { useRouter } from "next/router";
import { Timer, Truck } from "lucide-react";

const OrderDetail = ({ clearQueryParam }) => {
  const orderId = useRouter().query.orderId;
  console.log(orderId);
  const { data: order, isLoading } = useGetUserOrderById(
    orderId && {
      orderId: orderId,
    }
  );

  const { data: productImages } = useFetchProductImages({
    category: product?.categoryDetails.name,
    productName: product?.name,
  });

  console.log(order)

  const orderDate = new Date(order?.createdAt);
  orderDate.setDate(orderDate.getDate() + 7);

  return (
    <DialogContent className="bg-white p-4 font-sans pt-14">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Order Id</p>
            <p className="font-semibold">#{order?._id}</p>
          </div>
          <div
            className={`border rounded-lg p-1 text-center ${
              order?.orderStatus === "completed"
                ? "border-green-600 text-green-500"
                : order?.orderStatus === "cancelled"
                ? "border-red-600 text-red-500"
                : "border-yellow-500 text-yellow-500"
            }`}
          >
            {order?.orderStatus}
          </div>
        </div>
        <div className="flex gap-2 justify-evenly">
          <div className="bg-slate-100 rounded-lg p-2 w-full">
            <Truck size={20} />
            <p className="font-semibold">Estimated Arrival Date :</p>
            <p>{orderDate.toLocaleDateString()}</p>
          </div>
          <div className="bg-slate-100 rounded-lg p-2 w-full">
            <Timer size={20} />
            <p className="font-semibold">Delivered In :</p>
            <p>5 - 7 Days</p>
          </div>
        </div>
        <div className="bg-slate-100 p-2 rounded-lg">
            {/* {order?.products?.map((product, index) => (

            ))} */}
        </div>
        {/* <div className="bg-slate-100 rounded-lg p-2">
            <p className="font-semibold text-xl">Delivery Details</p>

        </div> */}
      </div>
    </DialogContent>
  );
};

export default OrderDetail;
