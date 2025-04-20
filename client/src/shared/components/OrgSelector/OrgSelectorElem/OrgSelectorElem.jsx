import useOrgStore from "../../../store/orgStore";

function OrgSelectorElem({ org, toggleDropDown }) {
  const setActiveOrg = useOrgStore((state) => state.setActiveOrg);

  function handleClick() {
    setActiveOrg(org || "Все организации");
    toggleDropDown();
  }

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
