import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: {},
      addItem: (newItem, id) =>
        set((state) => {
          const updatedCart = { ...state.cart };

          const { amount, quantity,price, ...productDetails } = newItem;

          if (updatedCart[id]) {
            if (
              updatedCart[id].options &&
              updatedCart[id].options[newItem.amount]
            ) {
              updatedCart[id].options[newItem.amount].quantity +=
                newItem.quantity;

            } else {
              updatedCart[id] = {
                ...updatedCart[id],
                options: {
                  ...updatedCart[id].options,
                  [newItem.amount]: {
                    quantity: newItem.quantity,
                    price: newItem.options[amount].price,
                  },
                },
              };
            }
            const totalQuantity = Object.values(updatedCart[id].options).reduce(
              (total, option) => total + option.quantity,
              0
            );
            updatedCart[id].totalQuantity = totalQuantity;

            const totalPrice = Object.values(updatedCart[id].options).reduce(
              (total, option) => total + option.price * option.quantity,
              0
            );
            updatedCart[id].totalPrice = totalPrice;
          } else {
            updatedCart[id] = {
              ...productDetails,
              options: {
                [newItem.amount]: {
                  quantity: newItem.quantity,
                  price: newItem.options[amount].price,
                },
              },
              totalQuantity: newItem.quantity,
              totalPrice: newItem.options[amount].price * newItem.quantity,
            };
          }

          return { cart: updatedCart };
        }),
      deleteItem: (id) =>
        set((state) => {
          const { [id]: deletedItem, ...rest } = state.cart;
          return { cart: rest };
        }),
      incrementQuantity: (amount, id) =>
        set((state) => {
          const updatedCart = { ...state.cart };
          if (updatedCart[id]) {
            updatedCart[id].options[amount].quantity += 1;
            updatedCart[id].totalPrice += updatedCart[id].options[amount].price;
          }
          const totalQuantity = Object.values(updatedCart[id].options).reduce(
            (total, option) => total + option.quantity,
            0
          );
          updatedCart[id].totalQuantity = totalQuantity;
          return { cart: updatedCart };
        }),
      decrementQuantity: (amount, id) =>
        set((state) => {
          console.log(amount, id);
          const updatedCart = { ...state.cart };

          if (updatedCart[id] && updatedCart[id].options[amount].quantity > 1) {
            updatedCart[id].options[amount].quantity -= 1;
            const totalQuantity = Object.values(updatedCart[id].options).reduce(
              (total, option) => total + option.quantity,
              0
            );
            updatedCart[id].totalQuantity = totalQuantity;
            updatedCart[id].totalPrice -= updatedCart[id].options[amount].price;
          } else {
            const { [amount]: removedOption, ...remainingOptions } =
              updatedCart[id].options;
            updatedCart[id].options = remainingOptions;

            if (Object.keys(remainingOptions).length === 0) {
              delete updatedCart[id];
            } else {
              const totalQuantity = Object.values(
                updatedCart[id].options
              ).reduce((total, option) => total + option.quantity, 0);
              updatedCart[id].totalQuantity = totalQuantity;
              const totalPrice = Object.values(updatedCart[id].options).reduce(
                (total, option) => total + option.price * option.quantity,
                0
              );
              updatedCart[id].totalPrice = totalPrice;
            }
          }
          return { cart: updatedCart };
        }),
      clearCart: () =>
        set(() => {
          return { cart: {} };
        }),
    }),
    {
      name: "cart-storage", // unique name for local storage key
    }
  )
);

export default useCartStore;

// addItem: (newItem, id) =>
//   set((state) => {
//     if (state.cart[id]) {
//       return {
//         cart: {
//           ...state.cart,
//           [id]: {
//             ...state.cart[id],
//             quantity: state.cart[id].quantity + newItem.quantity,
//           },
//         },
//       };
//     } else {
//       return { cart: { ...state.cart, [newItem._id]: newItem } };
//     }
//   }),
