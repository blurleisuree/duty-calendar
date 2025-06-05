import { useEffect } from "react";
import useCategoryStore from "../../store/categoryStore";
import useDutyStore from "../../../../shared/store/dutyStore";

function CategorySelectList({className}) {
  const duties = useDutyStore((state) => state.duties);
  const { categories, getAllCategories } = useCategoryStore();

  useEffect(() => {
    getAllCategories(duties);
  }, [duties, getAllCategories]);
  // console.log(categories);
  return (
    <div className={`${className} mt-10`}>
      <div></div>
    </div>
  );
}

export default CategorySelectList;
