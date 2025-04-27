import useOrgStore from "../../../store/orgStore";

import useViewTransition from "@shared/hooks/useViewTransition";

function OrgSelectorElem({ org, toggleDropDown }) {
  const setActiveOrg = useOrgStore((state) => state.setActiveOrg);

  const withTransition = useViewTransition();
  const handleClick = withTransition(() => {
    setActiveOrg(org || "Все организации");
    toggleDropDown();
  });

  return (
    <div
      onClick={handleClick}
      className=" flex items-center py-4 px-6 font-300 text-primary text-lg cursor-pointer hover:bg-blue-100 transition bg-blue-100 bg-transparent"
    >
      {org}
    </div>
  );
}

export default OrgSelectorElem;
