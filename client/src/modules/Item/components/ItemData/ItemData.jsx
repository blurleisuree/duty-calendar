import SubText from "../../../../shared/components/UI/SubText/SubText";
import Text from "../../../../shared/components/UI/Text/Text";
import Phone from "../../../../shared/components/UI/Phone/Phone";
import FullName from "../FullName/FullName";
import Border from "../Border/Border";

import { useState } from "react";

function ItemData({ duty }) {
  const [isDetailsActive, setIsDetailsActive] = useState(false);

  const toggleIsDetailsActive = () => {
    setIsDetailsActive(!isDetailsActive);
  };

  return (
    <>
      <div className="w-full pt-5 pb-5 px-5 font-300 pos-relative">
        {/* <p>{duty?.position}</p>
      <p>{duty?.timeEnd}</p>
      <p>{duty?.timeStart}</p>  */}
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
          {isDetailsActive && duty.timeStart && (
            <SubText className=" mt-3">Время дежурства с:</SubText>
          )}
          {isDetailsActive && duty.timeStart && <Text>{duty.timeStart}</Text>}
          {isDetailsActive && duty.timeEnd && (
            <SubText className=" mt-3">Время дежурства по:</SubText>
          )}
          {isDetailsActive && duty.timeEnd && <Text>{duty.timeEnd}</Text>}
        </div>
      </div>
      <Border handleClick={toggleIsDetailsActive} />
    </>
  );
}

export default ItemData;
