import SubText from "../../../../shared/components/UI/SubText/SubText";
import Text from "../../../../shared/components/UI/Text/Text";
import Phone from "../../../../shared/components/UI/Phone/Phone";
import FullName from "../FullName/FullName";
import Border from "../Border/Border";
import Time from "../Time/Time";

import { useState } from "react";

function ItemData({ duty }) {
  const [isDetailsActive, setIsDetailsActive] = useState(false);

  const toggleIsDetailsActive = () => {
    setIsDetailsActive(!isDetailsActive);
  };
  return (
    <>
      <div className="w-full pt-5 pb-5 px-5 font-300 pos-relative">
        <SubText>{duty?.organization}</SubText>
        {isDetailsActive && <SubText className="mt-3">ФИО</SubText>}
        <div
          className={`flex items-center justify-between w-full ${
            isDetailsActive ? "mt-1 flex-col items-baseline" : "mt-3"
          }`}
        >
          <FullName
            fullName={duty?.fullName || "undefind"}
            isFull={isDetailsActive}
          />
          {isDetailsActive && (
            <SubText className=" mt-3">Номер телефона</SubText>
          )}
          <Phone>{duty?.phone}</Phone>
          {isDetailsActive && <SubText className=" mt-3">Должность</SubText>}
          {isDetailsActive && <Text>{duty?.position}</Text>}
          {isDetailsActive && (
            <SubText className=" mt-3">Время дежурства с:</SubText>
          )}
          {isDetailsActive && <Time time={duty.timeStart}></Time>}
          {isDetailsActive && (
            <SubText className=" mt-3">Время дежурства по:</SubText>
          )}
          {isDetailsActive && <Time time={duty.timeEnd}></Time>}
        </div>
      </div>
      <Border handleClick={toggleIsDetailsActive} isDetailsActive={isDetailsActive}/>
    </>
  );
}

export default ItemData;
