import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { useMemo } from "react";

function useCalendarGrid(currentDate) {
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });

    const firstDayIndex = getDay(firstDayOfMonth);
    const offsetDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const daysWithOffset = [...Array(offsetDays).fill(null), ...daysInMonth];

    const totalSlots = Math.ceil(daysWithOffset.length / 7) * 7;
    const remainingSlots = totalSlots - daysWithOffset.length;
    const finalDays =
      remainingSlots > 0
        ? [...daysWithOffset, ...Array(remainingSlots).fill(null)]
        : daysWithOffset;

    return finalDays;
  }, [currentDate]);

  return calendarDays;
}

export default useCalendarGrid;
