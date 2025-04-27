import { useMemo } from "react";
import { useParams } from "react-router";

import useOrgStore from "@shared/store/orgStore";
import useDutyStore from "@shared/store/dutyStore";
import useValidateIsoDate from "@shared/hooks/useValidateISODate";

import DateTitle from "../DateTitle/DateTitle";
import ItemData from "../ItemData/ItemData";
import ErrorPath from "../ErrorPath/ErrorPath";
import ErrorScreen from "@shared/components/UI/ErrorScreen/ErrorScreen";

import useChangeDay from "../../hooks/useChangeDay";
import useViewTransition from "@shared/hooks/useViewTransition";
import { useSwipeable } from "react-swipeable";

function Item() {
  const { date } = useParams();
  const isDateInvalid = !useValidateIsoDate(date);

  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);

  const filteredDuties = useMemo(() => {
    if (isDateInvalid) return [];
    return getDuties(activeOrg === "Все организации" ? "" : activeOrg, date);
  }, [activeOrg, date, getDuties, isDateInvalid]);

  const changeDay = useChangeDay();
  const withTransition = useViewTransition();
  const handlers = useSwipeable({
    onSwipedLeft: withTransition(() => changeDay("next", date)),
    onSwipedRight: withTransition(() => changeDay("prev", date)),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
  });

  if (isDateInvalid) return <ErrorScreen>Неправильный формат даты</ErrorScreen>;

  return (
    <div className="pb-10 min-h-screen" {...handlers}>
      <DateTitle date={date} />
      {filteredDuties.length ? (
        filteredDuties.map((duty) => {
          return <ItemData duty={duty} key={duty.id} />;
        })
      ) : (
        <ErrorScreen>На данную дату нет данных</ErrorScreen>
      )}
    </div>
  );
}

export default Item;
