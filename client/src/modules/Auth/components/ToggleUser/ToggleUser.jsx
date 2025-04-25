import { useEffect } from "react";
import useUserStore from "../../store/userStore";

function ToggleUser() {
const {toggleUserIsAdmin, userIsAdmin} = useUserStore();
useEffect(() => {
console.log(userIsAdmin);
}, [userIsAdmin])
  return (
    <p
      className="mt-5 text-center text-active underline-1 underline cursor-pointer"
      onClick={toggleUserIsAdmin}
    >
      {userIsAdmin ? "Войти как обычный пользователь" : " Войти как администратор"}
    </p>
  );
}

export default ToggleUser;
