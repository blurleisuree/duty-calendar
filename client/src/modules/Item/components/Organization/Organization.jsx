import { useState } from "react";
import useViewTransition from "@shared/hooks/useViewTransition";

function Organization({ className, name, isDetailsActive }) {
  const withTransition = useViewTransition();
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongName = name.length > 25;

  const displayName =
    !isDetailsActive && isLongName && !isExpanded
      ? `${name.slice(0, 20)}...`
      : name;

  const handleToggle = withTransition(() => {
    if (isLongName) {
      setIsExpanded(!isExpanded);
    }
  });

  return (
    <p
      className={`${className} ${
        isLongName ? "cursor-pointer" : "cursor-default"
      } text-secondary whitespace-pre-wrap`}
      onClick={handleToggle}
    >
      {displayName}
    </p>
  );
}

export default Organization;
