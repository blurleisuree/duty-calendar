import arrow from "@assets/icons/CalendarArrow.svg";

function NavigationArrow({ className, handleClick }) {
  return (
    <button onClick={handleClick} className={`${className} cursor-pointer p-2`}>
      <img src={arrow} alt="navArrow" />
    </button>
  );
}

export default NavigationArrow;
