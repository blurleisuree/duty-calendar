function FullName({ fullName, className, isFull = true }) {
  if (!fullName) return <p className={`${className} text-lg text-primary`}></p>;

  const formatName = (fullName) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length < 2) return fullName;
    const lastName = parts[0];
    const firstNameInitial = parts[1] ? `${parts[1][0]}.` : "";
    const middleNameInitial = parts[2] ? `${parts[2][0]}.` : "";
    return `${lastName} ${firstNameInitial} ${middleNameInitial}`.trim();
  };

  return (
    <p className={`${className} text-lg text-primary`}>
      {isFull ? fullName : formatName(fullName)}
    </p>
  );
}

export default FullName;
