import { useNavigate } from "react-router";
import useViewTransition from "@shared/hooks/useViewTransition";

import arrow from "@assets/icons/arrowLeft.svg";

function ReturnElem({ children, path }) {
  const navigate = useNavigate();

  const withTransition = useViewTransition();
  const handleGoBack = withTransition(() => navigate(path));

  return (
    <button
      onClick={handleGoBack}
      className="flex items-center justify-between cursor-pointer"
    >
      <img src={arrow} alt="arrow" />
      <span className="text-xl text-active font-300 ml-2">{children}</span>
    </button>
  );
}

export default ReturnElem;
