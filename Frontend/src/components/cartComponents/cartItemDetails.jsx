import React from "react";

const CartItemDetails = ({key, value}) => {
  return (
    <div>
      <div key={key}>
        <div key={key} className="flex justify-between">
          <div className="flex gap-1 font-semibold">
            <p>
              {value.name} x {value.totalQuantity}
            </p>
          </div>
          <div>{value.totalPrice} Rs</div>
        </div>
        <div className="flex gap-2 text-xs items-center mb-2">
          {Object.entries(value.options).map(([key, value]) => (
            <p>
              ({key}ml x {value.quantity})
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartItemDetails;
