import { create } from "zustand";

const useStore = create((set) => ({
  isOpen: false,
  modalContent: null,

  openModal: (content) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null }),
}));

export default useStore;
