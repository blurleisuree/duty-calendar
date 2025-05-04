import useCategoryStore from "../../store/categoryStore";

import arrow from "@assets/icons/activeBottom.svg";

function CategoryTrigger({ className }) {
  const openModal = useCategoryStore((state) => state.openModal);

  return (
    <div
      className={`${className} inline-flex items-center w-full justify-center text-xl text-center text-active font-300 cursor-pointer active:opacity-40 transition`}
      onClick={openModal}
    >
      Организации
      <img src={arrow} alt="arrow" className="ml-1" />
    </div>
  );
}

export default CategoryTrigger;
