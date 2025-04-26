import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useMemo } from "react";

import useDutyStore from "@shared/store/dutyStore";
import useOrgStore from "@shared/store/orgStore";

import useViewTransition from "@shared/hooks/useViewTransition";

function Day({ day }) {
  const navigate = useNavigate();
  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);
  // const duties = useDutyStore((state) => state.duties);

  const withTransition = useViewTransition();
  const handleDayClick = (day) => {
    return withTransition(() => {
      if (day) {
        const formattedDay = format(day, "yyyy-MM-dd");
        navigate(`/calendar/${formattedDay}`);
      }
    });
  };

  const duties = getDuties(activeOrg === "Все организации" ? "" : activeOrg);
  const dutyDates = useMemo(() => {
    return duties.map((duty) => duty.date);
  }, [duties]);

  const hasDuty = (day) => {
    if (!day) return false;
    const formattedDay = format(day, "yyyy-MM-dd");
    return dutyDates.includes(formattedDay);
  };

  if (!day) return <div className="bg-gray-300"></div>;

  return (
    <div
      className={`p-3 font-400 text-primary cursor-pointer transition hover:bg-gray-300  bg-white ${
        hasDuty(day) &&
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
