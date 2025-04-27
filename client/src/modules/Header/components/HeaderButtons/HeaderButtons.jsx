import useOpenExitModal from "@shared/hooks/useOpenExitModal.jsx";
import { useAuthStore } from "../../../Auth/index";
import { Link } from "react-router";

import HeaderButton from "../HeaderButton/HeaderButton";

import settingsIcons from "@assets/icons/settings.svg";
import exitIcons from "@assets/icons/exit.svg";

function HeaderButtons({ className }) {
  const logout = useAuthStore((state) => state.logout);

  const openExitModal = useOpenExitModal(logout);

  return (
    <div className={`${className} flex items-center flex-1 justify-end`}>
      <HeaderButton src={exitIcons} handleClick={openExitModal} alt="exit" />

      <Link to="/admin" className="ml-4 p-1 box-content">
        <HeaderButton src={settingsIcons} className="w-4" alt="settingsIcon" />
      </Link>
    </div>
  );
}

export default HeaderButtons;
