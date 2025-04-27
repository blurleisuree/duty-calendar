import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";
import { useSwipeable } from "react-swipeable";
import useViewTransition from "@shared/hooks/useViewTransition";
import useCalendarGrid from "../../hooks/useCalendarGrid";

import useCalendarStore from "../../store/CalendarStore";

import CalendarNavigation from "../CalendarNavigation/CalendarNavigation";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import DayOfWeek from "../DayOfWeek/DayOfWeek";
import Day from "../Day/Day";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function Calendar() {
  const withTransition = useViewTransition();
  const { currentDate, shiftMonth } = useCalendarStore();

  const calendarDays = useCalendarGrid(currentDate);

  const handlers = useSwipeable({
    onSwipedLeft: withTransition(() => shiftMonth("next")),
    onSwipedRight: withTransition(() => shiftMonth("prev")),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="p-6 mt-2 w-full sm:max-w-lg mx-auto h-screen" {...handlers}>
      <CalendarNavigation />
      <div>
        <CalendarGrid>
          {DAYS_OF_WEEK.map((day) => (
            <DayOfWeek key={day}>{day}</DayOfWeek>
          ))}
        </CalendarGrid>
        <CalendarGrid className="gap-px bg-line border border-line">
          {calendarDays.map((day, index) => (
            <Day key={index + day} day={day} />
          ))}
        </CalendarGrid>
      </div>
    </div>
  );
}

export default Calendar;
