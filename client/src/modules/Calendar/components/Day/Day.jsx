import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useMemo } from "react";

import useDutyStore from "@shared/store/dutyStore";
import useOrgStore from "@shared/store/orgStore";

import useViewTransition from "@shared/hooks/useViewTransition";

import EmptyDay from "../EmptyDay/EmptyDay";

function Day({ day }) {
  const navigate = useNavigate();
  const withTransition = useViewTransition();
  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);

  const duties = getDuties(activeOrg === "Все организации" ? "" : activeOrg);

  const dutyDates = useMemo(() => {
    return duties.map((duty) => duty.date);
  }, [duties]);

  if (!day) return <EmptyDay />;

  const formattedDate = format(day, "yyyy-MM-dd");

  const isDutyDay = () => {
    return dutyDates.includes(formattedDate);
  };

  const handleDayClick = () => {
    return withTransition(() => {
      navigate(`/calendar/${formattedDate}`);
    });
  };

  return (
    <div
      className={`p-3 font-400 text-primary cursor-pointer transition hover:bg-gray-300  bg-white ${
        isDutyDay(day) &&
        "important:bg-secondary text-white important:hover:bg-active "
      }
      `}
      onClick={handleDayClick(day)}
    >
      {day ? format(day, "d") : ""}
    </div>
  );
}

export default Day;
