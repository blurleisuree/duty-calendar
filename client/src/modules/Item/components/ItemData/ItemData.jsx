import { useCallback } from "react";

import SubText from "@shared/components/UI/SubText/SubText";
import Text from "@shared/components/UI/Text/Text";
import Phone from "@shared/components/UI/Phone/Phone";
import FullName from "../FullName/FullName";
import Border from "../Border/Border";
import Time from "../Time/Time";
import ItemDataElem from "../ItemDataElem/ItemDataElem";
import Organization from "../Organization/Organization";

import { useState } from "react";

import useViewTransition from "@shared/hooks/useViewTransition";

function ItemData({ duty, services = false }) {
  const [isDetailsActive, setIsDetailsActive] = useState(false);

  const withTransition = useViewTransition();
  const toggleDetails = useCallback(() => {
    withTransition(() => {
      setIsDetailsActive((prev) => !prev);
    })();
  }, [withTransition]);

  const {
    organization = "",
    fullName = "",
    phone = "",
    position = "",
    timeStart = "",
    timeEnd = "",
  } = duty || {};

  const phoneDisplay = Array.isArray(phone) ? phone : ["Нет номера"];

  if (!position && !fullName) return null;

  return (
    <>
      <div className="w-full pt-5 pb-5 px-5 font-300 pos-relative ">
        <Organization name={organization} isDetailsActive={isDetailsActive} />
        {isDetailsActive && <SubText className="mt-3">ФИО</SubText>}

        <div
          className={`flex items-center justify-between w-full ${
            isDetailsActive ? "mt-1 flex-col items-baseline" : "mt-3"
          }`}
        >
          {!services ? (
            <FullName fullName={fullName} isFull={isDetailsActive} />
          ) : (
            <Text>{position}</Text>
          )}
          {isDetailsActive && (
            <SubText className=" mt-3">Номер телефона</SubText>
          )}
          {isDetailsActive ? (
            phoneDisplay.map((phone) => <Phone key={phone}>{phone}</Phone>)
          ) : (
            <Phone className="text-right">{phoneDisplay[0]}</Phone>
          )}

          {isDetailsActive && (
            <>
              <ItemDataElem>
                <SubText className=" mt-3">Должность</SubText>
                <Text className='leading-7'>{position}</Text>
              </ItemDataElem>
              <ItemDataElem>
                <SubText className=" mt-3">Время дежурства с:</SubText>
                <Time time={timeStart}></Time>
              </ItemDataElem>
              <ItemDataElem>
                <SubText className=" mt-3">Время дежурства по:</SubText>
                <Time time={timeEnd} />
              </ItemDataElem>
            </>
          )}
        </div>
      </div>
      <Border
        handleClick={toggleDetails}
        isDetailsActive={isDetailsActive}
        isServices={services}
      />
    </>
  );
}

export default ItemData;
