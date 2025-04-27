import { format } from "date-fns";
import { ru } from "date-fns/locale";

import useCalendarStore from "../../store/CalendarStore";

import useViewTransition from "@shared/hooks/useViewTransition";

import NavigationArrow from "@shared/components/UI/NavigationArrow/NavigationArrow";

function CalendarNavigation() {
  const { currentDate, shiftMonth } = useCalendarStore();

  const withTransition = useViewTransition();
  const handleShiftMonth = (direction) => {
    return withTransition(() => shiftMonth(direction));
  };

  return (
    <div className=" flex items-center justify-between mb-5">
      <h2 className="text-lg font-500 capitalize">
        {format(currentDate, "LLLL yyyy", { locale: ru })}
      </h2>
      <div className="flex items-center min-w-26 justify-between">
        <NavigationArrow handleClick={handleShiftMonth("prev")} />
        <NavigationArrow className="rotate-180" handleClick={handleShiftMonth("next")}
        />
      </div>
    </div>
  );
}

export default CalendarNavigation;
