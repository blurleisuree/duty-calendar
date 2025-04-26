import { useEffect } from "react";
import useAuthWayStore from "../../store/authWayStore";

function ToggleUser() {
  const { toggleAuthWay, authWayIsAdmin } = useAuthWayStore();
  useEffect(() => {
    console.log(authWayIsAdmin);
  }, [authWayIsAdmin]);
  return (
    <p
      className="mt-5 text-center text-active underline-1 underline cursor-pointer"
      onClick={toggleAuthWay}
    >
      {authWayIsAdmin
        ? "Войти как обычный пользователь"
        : " Войти как администратор"}
    </p>
  );
}

export default ToggleUser;
