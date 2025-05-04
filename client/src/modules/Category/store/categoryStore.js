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
    // all.push("Все организации");
    set({ categories: [...new Set(all)] });
  },
}));

export default useCategoryStore;
