import useCategoryStore from "../../store/categoryStore";

import CategorySelectList from "../CategorySelectList/CategorySelectList";
import CategoryModalTitle from "../CategoryModalTitle/CategoryModalTitle";
import Button from "@shared/components/UI/Button";

function CategoryModal() {
  const { modalIsActive } = useCategoryStore();

  return (
    <div className={`${!modalIsActive ? "hidden" : ""} flex p-3 h-85% w-full rounded-t-lg`}>
      <CategoryModalTitle />
      <CategorySelectList />
      <Button>Применить</Button>
    </div>
  );
}

export default CategoryModal;
