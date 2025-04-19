import classes from "./OrgSelector.module.css";
import { useEffect, useState } from "react";

import useOrgStore from "../../store/orgStore";
import useDutyStore from "../../store/dutyStore";

import OrgSelectorElem from "./OrgSelectorElem/OrgSelectorElem";

function OrgSelector() {
  const [dropDownIsActive, setDropDownIsActive] = useState(false);

  const toggleDropDown = () => {
    setDropDownIsActive(!dropDownIsActive);
  };

  const duties = useDutyStore((state) => state.duties);
  const { activeOrg, orgs, loading, error, getAllOrgs } = useOrgStore();

  useEffect(() => {
    getAllOrgs(duties);
  }, [getAllOrgs, duties]);

  return (
    <div className="relative h-min" onClick={toggleDropDown}>
      <div className="inline-flex items-center w-full justify-center text-lg font-400 text-primary cursor-pointer">
        {activeOrg}
        <svg
          className=" size-6 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {dropDownIsActive && orgs.length > 0 && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggleDropDown} />

          <div
            className={`block absolute right-0 mt-5 py-4 w-max bg-white rounded-lg z-50 ${classes.popup}`}
          >
            {orgs.map((org, index) => (
              <OrgSelectorElem
                key={index + org}
                toggleDropDown={toggleDropDown}
                org={org}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default OrgSelector;
