const useValidateISODate = (dateStr) => {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDateRegex.test(dateStr)) {
    return false;
  }

  // Проверяем, является ли дата действительной
  const date = new Date(dateStr);
  const [year, month, day] = dateStr.split("-").map(Number);
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month && 
    date.getDate() === day &&
    !isNaN(date.getTime()) 
  );
};

export default useValidateISODate;
