import useCategoryStore from "../../store/categoryStore";

import CategorySelectList from "../CategorySelectList/CategorySelectList";
import CategoryMainTitle from "../CategoryMainTitle/CategoryMainTitle";

import Button from "@shared/components/UI/Button/Button";

function CategoryMain() {
  const { modalIsActive, openModal, closeModal } = useCategoryStore();

  return (
    <div className="rounded-t-3xl p-5 h-full flex-col bg-white relative">
      <CategoryMainTitle />
      <CategorySelectList className="flex-1"/>
      <div className="w-full py-6 bg-white">
        <Button className="bg-secondary border-secondary text-white px-16 py-3 ">
          Применить
        </Button>
      </div>
    </div>
  );
}

export default CategoryMain;
