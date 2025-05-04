import useCategoryStore from "../../store/categoryStore";

function Category() {
  const { modalIsActive, openModal, closeModal } = useCategoryStore();

  return (
    <div>
      <CategoryTrigger/>

      <CategoryModal />
    </div>
  );
}

export default Category;
