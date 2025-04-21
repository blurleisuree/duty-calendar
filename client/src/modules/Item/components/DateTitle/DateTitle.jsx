import { format } from "date-fns";
import { ru } from "date-fns/locale";

function DateTitle({ date }) {
  const dayOfWeekName = format(date, "EEEE", { locale: ru });

  const localDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <h3 className="text-primary text-lg text-center mt-4 border-b-line border-b pb-4 capitalize">
      {dayOfWeekName} – {localDate}
    </h3>
  );
}

export default DateTitle;
