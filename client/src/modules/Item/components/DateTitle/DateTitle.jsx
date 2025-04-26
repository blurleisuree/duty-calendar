import { format } from "date-fns";
import { ru } from "date-fns/locale";

import arrow from "@assets/icons/itemArrow.svg";
import useChangeDay from "../../hooks/useChangeDay";

function DateTitle({ date }) {
  const dayOfWeekName = format(date, "EEEE", { locale: ru });

  const localDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const changeDay = useChangeDay();
  const handleClick = (direction) => {
    return () => {
      changeDay(direction, date);
    };
  };

  return (
    <h3
      className="text-primary text-lg text-center mt-4 border-b-line border-b pb-4 capitalize flex items-center justify-between px-5 "
    >
      <img
        src={arrow}
        alt="arrow"
        onClick={handleClick("prev")}
        className="cursor-pointer p-2"
      />
      {dayOfWeekName} – {localDate}
      <img
        src={arrow}
        alt="arrow"
        className="transform rotate-180 cursor-pointer p-2"
        onClick={handleClick("next")}
      />
    </h3>
  );
}

export default DateTitle;
