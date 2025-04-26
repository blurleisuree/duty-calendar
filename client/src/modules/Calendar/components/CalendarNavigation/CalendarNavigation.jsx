import useCalendarStore from "../../store/CalendarStore";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import arrow from "@assets/icons/CalendarArrow.svg";

function CalendarNavigation() {
  const { currentDate, shiftMonth } = useCalendarStore();

  const handleShiftMonth = (direction) => {
    return () => shiftMonth(direction);
  };

  return (
    <div className=" flex items-center justify-between mb-5">
      <h2 className="text-lg font-500 capitalize">
        {format(currentDate, "LLLL yyyy", { locale: ru })}
      </h2>
      <div className="flex items-center min-w-26 justify-between">
        <button
          onClick={handleShiftMonth("prev")}
          className="cursor-pointer p-2"
        >
          <img src={arrow} alt="arrow" />
        </button>
        <button
          onClick={handleShiftMonth("next")}
          className="cursor-pointer p-2"
        >
          <img src={arrow} alt="arrow" className="transform rotate-180" />
        </button>
      </div>
    </div>
  );
}

export default CalendarNavigation;
