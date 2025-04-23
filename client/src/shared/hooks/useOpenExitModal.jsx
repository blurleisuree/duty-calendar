import useModalStore from "../store/modalStore";
import { useAuthStore } from "../../modules/Auth/index";

import Button from "../components/UI/Button/Button";

function useOpenExitModal() {
  const { openModal, closeModal } = useModalStore();
  const logout = useAuthStore((state) => state.logout);

  function exit() {
    closeModal();
    logout();
  }

  return () =>
    openModal(
      <div>
        <p className="text-lg text-black font-medium">
          Вы уверены, что хотите выйти из аккаунта?
        </p>
        <div className="mt-6 flex">
          <Button onClick={closeModal} className="py-2 px-7">
            Отмена
          </Button>
          <Button
            onClick={exit}
            className="py-2 px-7 ml-4"
          >
            Выйти
          </Button>
        </div>
      </div>
    );
}

export default useOpenExitModal;
