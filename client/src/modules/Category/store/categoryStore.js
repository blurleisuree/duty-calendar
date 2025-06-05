import { create } from "zustand";

const useCategoryStore = create((set) => ({
  modalIsActive: false,
  activeCategories: [],
  categories: [],

  openModal: () => {
    set({ modalIsActive: true });
  },

  closeModal: () => {
    set({ modalIsActive: false });
  },

  getAllCategories: (duties) => {
    const all = duties.map((duty) => {
      return {
        category: duty.category,
        subcategory: duty.subcategory,
        organisation: duty.organization,
      };
    });

    // const uniqueCategories = Array.from(
    //   new Map(
    //     all.map((item) => [
    //       `${item.category}|${item.subcategory}|${item.organisation}`,
    //       item,
    //     ])
    //   ).values()
    // );
    // all.push("Все организации");

    // set({ categories: uniqueCategories });
    set({ categories: [...new Set(all)] });
  },
}));

export default useCategoryStore;
