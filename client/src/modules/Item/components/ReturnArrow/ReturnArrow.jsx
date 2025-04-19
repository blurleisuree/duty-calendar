import { useNavigate } from "react-router";
import arrow from "../../../../assets/icons/arrow-left-white.svg";

function ReturnArrow({ children }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/calendar");
  };

  return (
    <button onClick={handleGoBack} className="flex items-center justify-between cursor-pointer">
      <img src={arrow} alt="arrow" />
      <span className="text-2xl text-primary ml-2">{children}</span>
    </button>
  );
}

export default ReturnArrow;
