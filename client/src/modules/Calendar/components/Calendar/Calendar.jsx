import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { ru } from "date-fns/locale";

import useCalendarStore from "../../store/CalendarStore";

import CalendarNavigation from "../CalendarNavigation/CalendarNavigation";
import Day from "../Day/Day";

function Calendar() {
  const { currentDate } = useCalendarStore();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const firstDayIndex = getDay(firstDayOfMonth);
  const offsetDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const calendarDays = [...Array(offsetDays).fill(null), ...daysInMonth];

  const totalSlots = Math.ceil(calendarDays.length / 7) * 7;
  const remainingSlots = totalSlots - calendarDays.length;
  if (remainingSlots > 0) {
    calendarDays.push(...Array(remainingSlots).fill(null));
  }

  const daysArr = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <div className="p-6 mt-2 max-w-full sm:max-w-lg mx-auto">
      <CalendarNavigation />
      <div>
        <div className="grid grid-cols-7 text-center">
          {daysArr.map((day) => (
            <div className="p-2 text-primary font-medium" key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 text-center gap-px bg-line border border-line">
          {calendarDays.map((day, index) => (
            <Day key={index} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
