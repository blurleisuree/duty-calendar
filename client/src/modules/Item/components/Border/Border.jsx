import classes from "./Border.module.css";

import arrow from "@assets/icons/activeBottomGray.svg";

function Border({ handleClick, isDetailsActive, isServices }) {
  if (isServices)
    return (
      <div className="flex items-center">
        <div className={`${classes.line} bg-line flex-1`}></div>

        <span className="text-line font-300 px-2">Оперативная служба</span>

        <div className={`${classes.line} bg-line flex-1`}></div>
      </div>
    );

  return (
    <div className="flex items-center">
      <div className={`${classes.line} bg-line flex-1`}></div>
      <div
        className="flex items-center px-2 cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-line font-300 mr-1">Подробнее</span>
        <img
          src={arrow}
          alt="arrow"
          className={isDetailsActive ? " transform-rotate-180" : ""}
        />
      </div>
      <div className={`${classes.line} bg-line flex-1`}></div>
    </div>
  );
}

export default Border;
