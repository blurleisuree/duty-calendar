import { create } from "zustand";

const useUserStore = create((set, get) => ({
  userIsAdmin: (() => localStorage.getItem("userIsAdmin") === "true")() ,

  toggleUserIsAdmin: () => {
    set({ userIsAdmin: !get().userIsAdmin });
    localStorage.setItem("userIsAdmin", get().userIsAdmin);
  },
}));

export default useUserStore;
