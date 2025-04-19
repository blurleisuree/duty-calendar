function DateTitle({ day, date }) {
  const localDate = new Date(date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <h3 className="text-primary text-xl text-center">
      {day} – {localDate}
    </h3>
  );
}

export default DateTitle;
