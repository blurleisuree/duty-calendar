import useCategoryStore from "../../store/categoryStore";

function CategorySelectList() {
  const { categories } = useCategoryStore();
  console.log(categories);
  return (
    <div className="mt-3">
      <div></div>
    </div>
  );
}

export default CategorySelectList;
