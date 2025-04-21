import useCalendarStore from "../../store/CalendarStore";
import { subMonths, addMonths, format } from "date-fns";
import { ru } from "date-fns/locale";

import arrow from "../../../../assets/icons/CalendarArrow.svg";

function CalendarNavigation() {
  const { currentDate, setCurrentDate } = useCalendarStore();

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className=" flex items-center justify-between mb-5">
      <h2 className="text-lg font-500 capitalize">
        {format(currentDate, "LLLL yyyy", { locale: ru })}
      </h2>
      <div className="flex items-center min-w-26 justify-between">
        <button onClick={handlePreviousMonth} className="cursor-pointer p-2">
          <img src={arrow} alt="arrow" />
        </button>
        <button onClick={handleNextMonth} className="cursor-pointer p-2">
          <img src={arrow} alt="arrow" className="transform rotate-180" />
        </button>
      </div>
    </div>
  );
}

export default CalendarNavigation;
