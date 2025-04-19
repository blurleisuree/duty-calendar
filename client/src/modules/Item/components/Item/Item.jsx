import { useEffect } from "react";
import { useParams } from "react-router";

import useOrgStore from "../../../../shared/store/orgStore";
import useDutyStore from "../../../../shared/store/dutyStore";
import useValidateIsoDate from "../../hooks/useValidateISODate";

import ReturnArrow from "../ReturnArrow/ReturnArrow";
import DateTitle from "../DateTitle/DateTitle";

function Item() {
  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);

  const { date } = useParams();
  const isDateValid = !useValidateIsoDate(date);

  useEffect(() => {
    if (isDateValid) return;

    const filteredDuties = getDuties(
      activeOrg === "Все организации" ? "" : activeOrg,
      date
    );
    console.log(filteredDuties);
  }, [activeOrg, date, getDuties, isDateValid]);

  if (isDateValid)
    return <p className="text-2xl text-primary">Неправильный формат даты</p>;

  const day = "Суббота";

  return (
    <div>
      <ReturnArrow>{date.slice(0, 4)}</ReturnArrow>
      <DateTitle day={day} date={date} />
    </div>
  );
}

export default Item;
