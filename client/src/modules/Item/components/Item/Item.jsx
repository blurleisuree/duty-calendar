import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useOrgStore from "../../../../shared/store/orgStore";
import useDutyStore from "../../../../shared/store/dutyStore";
import useValidateIsoDate from "../../../../shared/hooks/useValidateISODate";

import DateTitle from "../DateTitle/DateTitle";
import ItemData from "../ItemData/ItemData";

function Item() {
  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);

  const { date } = useParams();
  const isDateValid = !useValidateIsoDate(date);

  const [filteredDuties, setFilteredDuties] = useState(null);

  useEffect(() => {
    if (isDateValid) return;

    setFilteredDuties(
      getDuties(activeOrg === "Все организации" ? "" : activeOrg, date)
    );
  }, [activeOrg, date, getDuties, isDateValid]);

  if (isDateValid)
    return <p className="text-2xl text-primary">Неправильный формат даты</p>;

  const day = "Суббота";

  return (
    <div className="pb-10">
      <DateTitle day={day} date={date} />
      {filteredDuties &&
        filteredDuties.map((duty, index) => {
          return <ItemData duty={duty} key={duty.id || index} />;
        })}
    </div>
  );
}

export default Item;
