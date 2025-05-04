import { useMemo } from "react";
import { useParams } from "react-router";

import useOrgStore from "@shared/store/orgStore";
import useDutyStore from "@shared/store/dutyStore";
import useValidateIsoDate from "@shared/hooks/useValidateISODate";
import useItemStore from "../../store/itemStore";

import DateTitle from "../DateTitle/DateTitle";
import ItemData from "../ItemData/ItemData";
import ErrorPath from "../ErrorPath/ErrorPath";
import ItemFilter from "../ItemFilter/ItemFilter";
import ErrorScreen from "@shared/components/UI/ErrorScreen/ErrorScreen";

import useChangeDay from "../../hooks/useChangeDay";
import useViewTransition from "@shared/hooks/useViewTransition";
import { useSwipeable } from "react-swipeable";

function Item() {
  const { date } = useParams();
  const isDateInvalid = !useValidateIsoDate(date);

  const activeCategory = useItemStore((state) => state.activeCategory);

  const activeOrg = useOrgStore((state) => state.activeOrg);
  const getDuties = useDutyStore((state) => state.getDuties);
  const getServices = useDutyStore((state) => state.getServices);

  const filteredDuties = useMemo(() => {
    if (isDateInvalid) return [];
    return getDuties(activeOrg === "Все организации" ? "" : activeOrg, date);
  }, [activeOrg, date, getDuties, isDateInvalid]);
  
  const servicesArr = useMemo(() => {
    if (isDateInvalid) return [];
    return getServices(activeOrg === "Все организации" ? "" : activeOrg);
  }, [activeOrg, getServices, isDateInvalid]);

  const changeDay = useChangeDay();
  const withTransition = useViewTransition();
  const handlers = useSwipeable({
    onSwipedLeft: withTransition(() => changeDay("next", date)),
    onSwipedRight: withTransition(() => changeDay("prev", date)),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
  });

  const shouldRenderDuties =
    activeCategory === "all" || activeCategory === "operators";

  const shouldRenderServices =
    activeCategory === "all" || activeCategory === "services";

  const shouldRenderAll = !filteredDuties.length && !servicesArr.length;

  if (isDateInvalid) return <ErrorScreen>Неправильный формат даты</ErrorScreen>;

  return (
    <div className="pb-10 min-h-screen" {...handlers}>
      <DateTitle date={date} />
      {/* Переделать */}
      {shouldRenderAll && <ErrorScreen>На данную дату нет данных</ErrorScreen>}
      {!shouldRenderAll && (
        <ItemFilter
          dutiesIsExists={filteredDuties.length}
          servicesIsExists={servicesArr.length}
        />
      )}
      {shouldRenderDuties &&
        filteredDuties.map((duty) => <ItemData key={duty.id} duty={duty} />)}
      {shouldRenderServices &&
        servicesArr.map((duty) => (
          <ItemData key={duty.id} duty={duty} services={true} />
        ))}
    </div>
  );
}

export default Item;
