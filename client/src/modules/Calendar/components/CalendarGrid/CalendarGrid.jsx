function CalendarGrid({ children, className }) {
  return (
    <div className={`${className} grid grid-cols-7 text-center`}>
      {children}
    </div>
  );
}

export default CalendarGrid;
