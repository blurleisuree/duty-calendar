import useModalStore from "../store/modalStore";

import Button from "../components/UI/Button/Button";

function useOpenExitModal(logout) {
  const { openModal, closeModal } = useModalStore();

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
          <Button
            onClick={closeModal}
            className="py-2 px-7 border-2 border-active text-active font-500 text-sm"
          >
            Отмена
          </Button>
          <Button
            onClick={exit}
            className="py-2 px-7 ml-4 border-2 border-secondary text-secondary font-500 text-sm"
          >
            Выйти
          </Button>
        </div>
      </div>
    );
}

export default useOpenExitModal;
