import cross from "../../../assets/icons/cross.svg";

import useModalStore from "../../store/modalStore";

function Modal() {
  const { isOpen, modalContent, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="bg-white rounded-lg shadow-lg max-w-lg  p-6 relative flex flex-row-reverse items-start ">
        <button
          onClick={closeModal}
          className=" text-gray-500 hover:text-gray-700 w-fit min-w-5 block ml-2"
        >
          <img
            src={cross}
            onClick={closeModal}
            className="w-5 cursor-pointer hover:scale-125 ease-linear transition duration-150"
          />
        </button>
        <div>{modalContent}</div>
      </div>
    </div>
  );
}

export default Modal;
