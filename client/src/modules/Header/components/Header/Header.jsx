import OrgSelector from "../../../../shared/components/OrgSelector/OrgSelector";
import ReturnElem from "../../../../shared/components/UI/ReturnElem/ReturnElem";
import Logo from "../../../../shared/components/UI/Logo/Logo";

import upload from "../../../../assets/icons/upload.svg";

import { useParams, Link } from "react-router";

function Header() {
  const { date } = useParams();

  return (
    <div className="flex flex-col w-screen pt-9 pb-7 px-5 border-b border-b-line">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {date && <ReturnElem>{date.slice(0, 4)}</ReturnElem>}
        </div>
        <Link to="/" className="flex-0">
          <Logo type="mini" className="cursor-pointer" />
        </Link>
        <div className="flex-1 flex justify-end">
          <img src={upload} alt="uploadIcon" className="w-4 cursor-pointer" />
        </div>
      </div>
      <OrgSelector />
    </div>
  );
}

export default Header;
