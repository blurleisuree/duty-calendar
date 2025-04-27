import Text from "@shared/components/UI/Text/Text";

function Time({ time, className }) {
  const formatTimeFromFraction = (fraction) => {
    if (fraction === null || fraction === undefined) return "Не указано";

    const totalHours = fraction * 24;

    const hours = Math.floor(totalHours);

    const minutes = Math.round((totalHours - hours) * 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  return <Text className={className}>{formatTimeFromFraction(time)}</Text>;
}

export default Time;
