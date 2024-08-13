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
      addUserInfo: (newUserInfo) => set(() => ({ currentUser: newUserInfo, isLoading: false })),
      deleteUserInfo: () => set(() => ({ currentUser: null, isLoading: false })),
    }),
    { name: "current-user" }
  )
);

export default useUserStore;
