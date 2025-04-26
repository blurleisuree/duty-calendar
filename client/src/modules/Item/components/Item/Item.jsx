import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useOrgStore from "@shared/store/orgStore";
import useDutyStore from "@shared/store/dutyStore";
import useValidateIsoDate from "@shared/hooks/useValidateISODate";

import DateTitle from "../DateTitle/DateTitle";
import ItemData from "../ItemData/ItemData";
import EmptyData from "../EmptyData/EmptyData";
import ErrorPath from "../ErrorPath/ErrorPath";

import useChangeDay from "../../hooks/useChangeDay";
import { useSwipeable } from "react-swipeable";

function Item() {
  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);

  const { date } = useParams();
  const isDateValid = !useValidateIsoDate(date);

  const [filteredDuties, setFilteredDuties] = useState([]);

  useEffect(() => {
    if (isDateValid) return;

    setFilteredDuties(
      getDuties(activeOrg === "Все организации" ? "" : activeOrg, date)
    );
  }, [activeOrg, date, getDuties, isDateValid]);

  const changeDay = useChangeDay();
  const handlers = useSwipeable({
    onSwipedLeft: () => changeDay("next", date)(),
    onSwipedRight: () => changeDay("prev", date)(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
  });

  if (isDateValid) return <ErrorPath />;

  return (
    <div className="pb-10 min-h-screen" {...handlers}>
      <DateTitle date={date} />
      {filteredDuties.length ? (
        filteredDuties.map((duty, index) => {
          return <ItemData duty={duty} key={duty.id || index} />;
        })
      ) : (
        <EmptyData />
      )}
    </div>
  );
}

export default Item;
