import OrgSelector from "../../../../shared/components/OrgSelector/OrgSelector";
import ReturnElem from "../../../../shared/components/UI/ReturnElem/ReturnElem";
import Logo from "../../../../shared/components/UI/Logo/Logo";

import useValidateIsoDate from "../../../../shared/hooks/useValidateISODate";

import upload from "../../../../assets/icons/upload.svg";
import exit from "../../../../assets/icons/exit.svg";

import { useParams, Link, useLocation } from "react-router";
import useOpenExitModal from "../../../../shared/hooks/useOpenExitModal.jsx";

function Header() {
  const { date } = useParams();
  const url = useLocation().pathname;

  const isDateValid = useValidateIsoDate(date);

  const openExitModal = useOpenExitModal();

  return (
    <div className="flex flex-col w-screen pt-9 pb-7 px-5 border-b border-b-line">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {date && (
            <ReturnElem path="/calendar">
              {isDateValid ? date.slice(0, 4) : ""}
            </ReturnElem>
          )}
          {url === "/admin" && <ReturnElem path="-1"></ReturnElem>}
        </div>
        <Link to="/calendar" className="flex-0">
          <Logo type="mini" className="cursor-pointer" />
        </Link>
        <div className="flex items-center flex-1  justify-end">
          <img
            src={exit}
            alt="exit"
            onClick={openExitModal}
            className="cursor-pointer p-1 box-content"
          />
          <Link to="/admin" className="ml-4 p-1 box-content">
            <img
              src={upload}
              alt="uploadIcon"
              className="w-4 cursor-pointer box-content"
            />
          </Link>
        </div>
      </div>
      {!(url === "/admin") && <OrgSelector />}
    </div>
  );
}

export default Header;
