import useCategoryStore from "../../store/categoryStore";

import CategoryMain from "../CategoryMain/CategoryMain";

function CategoryModal() {
  const { modalIsActive, closeModal } = useCategoryStore();

  return (
    <div
      onClick={closeModal}
      className={`${
        !modalIsActive ? "hidden" : ""
      } w-full h-full overflow-hidden fixed block z-50 pt-32 bg-black bg-opacity-50 inset-0`}
    >
      <CategoryMain />
    </div>
  );
}

export default CategoryModal;
