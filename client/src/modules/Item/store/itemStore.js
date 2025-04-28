import { create } from "zustand";

const useItemStore = create((set) => ({
  activeCategory: "all",

  changeCategory: (category) => {
    if (!category) set({ activeCategory: "all" });

    if (category === "services") set({ activeCategory: "services" });

    if (category === "operators") set({ activeCategory: "operators" });

    if (category === "all") set({ activeCategory: "all" });
  },
}));

export default useItemStore;
