import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";

import { useNavigate } from "react-router";

import arrow from "@assets/icons/itemArrow.svg";

function DateTitle({ date }) {
  const dayOfWeekName = format(date, "EEEE", { locale: ru });

  const localDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const navigate = useNavigate();
  const handleClick = (direction) => {
    return () => {
      if (direction === "next") {
        const nextDate = format(addDays(date, 1), "yyyy-MM-dd")
        navigate(`/calendar/${nextDate}`);
      } else if (direction === "prev") {
        const prevDate = format(addDays(date, -1), "yyyy-MM-dd");
        navigate(`/calendar/${prevDate}`);
      }
    };
  };

  return (
    <h3 className="text-primary text-lg text-center mt-4 border-b-line border-b pb-4 capitalize flex items-center justify-between px-5 ">
      <img src={arrow} alt="arrow" onClick={handleClick("prev")} className="cursor-pointer p-2"/>
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
