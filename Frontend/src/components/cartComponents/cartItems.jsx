import { useFetchProductImages } from "@/hooks/query";
import useCartStore from "@/store/cart";
import Link from "next/link";
import {  Minus, Plus } from "lucide-react";
import React from "react";

const CartItem = ({ itemKey, itemValue }) => {
  const { data: productImage } = useFetchProductImages({
    category: itemValue?.categoryDetails.name,
    productName: itemValue?.name,
  });

  const { incrementQuantity, decrementQuantity, deleteItem } = useCartStore()

  return (
    <div>
      <div
        key={itemKey}
        className=" flex flex-col w-full border border-slate-300 rounded-lg p-2"
      >
        <div href={`/products/${itemKey}`} className="flex justify-between items-center hover:bg-slate-100 duration-200 cursor-pointer">
          <div className="flex gap-2 items-center">
            <div className="w-[100px] h-[100px]">
              <img
              className="aspect-square object-contain"
                src={`data:image/jpeg;base64,${productImage && productImage[0]}`}
                alt={`Product Image`}
              />
            </div>
            <div className=" text-lg mob_display:text-sm">{itemValue.name}</div>
          </div>
          <div className="flex gap-2">
            <div className="p-1 flex flex-col items-center gap-2">
              {Object.entries(itemValue.options).map(
                ([optionKey, optionValue]) => (
                  <div
                    key={optionKey}
                    className="flex gap-2 items-center text-xs"
                  >
                    <p>
                      {optionKey}ml x {optionValue.quantity}
                    </p>
                    <div className="border border-slate-300 rounded-md p-1 flex z-20">
                      <Minus
                        onClick={() => decrementQuantity(optionKey, itemKey)}
                        className="h-3 w-3 cursor-pointer hover:bg-slate-200 duration-200 "
                      />
                      <Plus
                        onClick={() => incrementQuantity(optionKey, itemKey)}
                        className="h-3 w-3 cursor-pointer hover:bg-slate-200 duration-200 "
                      />
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-gray-800 font-semibold pr-8 mob_display:text-xs mob_display:pr-0">
                <div>Total quantity: {itemValue.totalQuantity}</div>
              </div>
              <div className="z-10" onClick={() => deleteItem(itemValue._id)}>
                <img
                  className="hover:bg-slate-200 duration-200 rounded-full p-1 cursor-pointer"
                  src="/images/trash.png"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
