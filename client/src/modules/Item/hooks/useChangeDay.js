import { useNavigate } from "react-router";
import { format, addDays } from "date-fns";

const useChangeDay = () => {
  const navigate = useNavigate();

  const changeDay = (direction, date) => {
    const newDate =
      direction === "next"
        ? format(addDays(date, 1), "yyyy-MM-dd")
        : format(addDays(date, -1), "yyyy-MM-dd");

    if (!document.startViewTransition) {
      return navigate(`/calendar/${newDate}`);
    }
    document.startViewTransition(() => navigate(`/calendar/${newDate}`));
  };

  return changeDay;
};

export default useChangeDay;
