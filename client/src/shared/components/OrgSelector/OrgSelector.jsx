import classes from "./OrgSelector.module.css";
import { useEffect, useState } from "react";

import useOrgStore from "../../store/orgStore";
import useDutyStore from "../../store/dutyStore";

import useViewTransition from "@shared/hooks/useViewTransition";

import OrgSelectorElem from "./OrgSelectorElem/OrgSelectorElem";

import arrow from "@assets/icons/activeBottom.svg";

function OrgSelector() {
  const [dropDownIsActive, setDropDownIsActive] = useState(false);

  const withTransition = useViewTransition();
  const toggleDropDown = withTransition(() => {
    setDropDownIsActive(!dropDownIsActive);
  });

  const duties = useDutyStore((state) => state.duties);
  const { activeOrg, orgs, getAllOrgs, error, loading } = useOrgStore();

  useEffect(() => {
    getAllOrgs(duties);
  }, [getAllOrgs, duties]);

  return (
    <div className="relative h-min mt-5 max-w-screen" onClick={toggleDropDown}>
      <div className="inline-flex items-center w-full justify-center text-xl text-active font-300 cursor-pointer active:opacity-40 transition">
        {activeOrg}
        <img src={arrow} alt="arrow" className="ml-1" />
      </div>

      {dropDownIsActive && orgs.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggleDropDown} />

          <div
            className={`block absolute mt-5 py-4 w-max bg-white rounded-lg z-50 ${classes.popup}`}
          >
            {orgs.map((org) => (
              <OrgSelectorElem
                key={org}
                toggleDropDown={toggleDropDown}
                org={org}
              />
            ))}
          </div>
        </>
      )}
      {loading && <div className="mt-2 text-gray-500">Загрузка...</div>}
      {error && (
        <div className="mt-2 text-red-500">Ошибка: {error.message}</div>
      )}
    </div>
  );
}

export default OrgSelector;
