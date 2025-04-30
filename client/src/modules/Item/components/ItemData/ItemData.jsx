import { useCallback } from "react";

import SubText from "@shared/components/UI/SubText/SubText";
import Text from "@shared/components/UI/Text/Text";
import Phone from "@shared/components/UI/Phone/Phone";
import FullName from "../FullName/FullName";
import Border from "../Border/Border";
import Time from "../Time/Time";
import ItemDataElem from "../ItemDataElem/ItemDataElem";

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

  if (!position && !fullName) return null;

  return (
    <>
      <div className="w-full pt-5 pb-5 px-5 font-300 pos-relative">
        {services && (
          <SubText className="mb-3 text-secondary">Оперативная служба</SubText>
        )}
        <SubText>{organization}</SubText>
        {isDetailsActive && (
          <SubText className="mt-3">{services ? "Должность" : "ФИО"}</SubText>
        )}
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
          <Phone>{phone}</Phone>
          {isDetailsActive && (
            <>
              <ItemDataElem>
                <SubText className=" mt-3">
                  {services ? "ФИО" : "Должность"}
                </SubText>
                <Text>
                  {services ? (fullName ? fullName : "Не указано") : position}
                </Text>
              </ItemDataElem>
              {!services && (
                <ItemDataElem>
                  <SubText className=" mt-3">Время дежурства с:</SubText>
                  <Time time={timeStart}></Time>
                </ItemDataElem>
              )}
              {!services && (
                <ItemDataElem>
                  <SubText className=" mt-3">Время дежурства по:</SubText>
                  <Time time={timeEnd} />
                </ItemDataElem>
              )}
            </>
          )}
        </div>
      </div>
      <Border handleClick={toggleDetails} isDetailsActive={isDetailsActive} />
    </>
  );
}

export default ItemData;
