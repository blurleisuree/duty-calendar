import { create } from "zustand";

const useAuthWayStore = create((set, get) => ({
  authWayIsAdmin: (() => localStorage.getItem("authWayIsAdmin") === "true")() ,

  toggleAuthWay: () => {
    set({ authWayIsAdmin: !get().authWayIsAdmin });
    localStorage.setItem("authWayIsAdmin", get().authWayIsAdmin);
  },
}));

export default useAuthWayStore;
