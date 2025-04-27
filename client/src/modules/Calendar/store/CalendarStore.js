import { create } from "zustand";
import { addMonths, subMonths } from "date-fns";

const useCalendarStore = create((set) => ({
  currentDate: new Date(),
  setCurrentDate: (date) => set({ currentDate: date }),

  shiftMonth: (direction) => {
    set((state) => {
      const newDate =
        direction === "next"
          ? addMonths(state.currentDate, 1)
          : subMonths(state.currentDate, 1);

      return { currentDate: newDate };
    });
  },
}));

export default useCalendarStore;
