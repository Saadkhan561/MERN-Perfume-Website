import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      // user: {
      //   currentUser: null
      // },
      // cart: {}
      currentUser: null,
      isLoading: true,
      addUserInfo: (newUserInfo) =>
        set(() => ({ currentUser: newUserInfo, isLoading: false })),
      deleteUserInfo: () =>
        set(() => ({ currentUser: null, isLoading: false })),
      addUserAddress: (addressObj) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser, 
            user: {
              ...state.currentUser?.user, 
              address: addressObj.address,
              city: addressObj.city 
            },
          },
        })),
    }),
    { name: "current-user" }
  )
);

export default useUserStore;
