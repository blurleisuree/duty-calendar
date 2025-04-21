import { create } from "zustand";

const useCalendarStore = create((set) => ({
  currentDate: new Date(),

  setCurrentDate: (value) => {
    set({ currentDate: value });
  },
}));

export default useCalendarStore;
