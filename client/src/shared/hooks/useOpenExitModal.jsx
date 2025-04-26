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
            className="py-2 px-7 bg-none border-2 border-active important:text-active font-500"
          >
            Отмена
          </Button>
          <Button
            onClick={exit}
            className="py-2 px-7 ml-4 bg-none border-2 border-secondary important:text-secondary font-500"
          >
            Выйти
          </Button>
        </div>
      </div>
    );
}

export default useOpenExitModal;
