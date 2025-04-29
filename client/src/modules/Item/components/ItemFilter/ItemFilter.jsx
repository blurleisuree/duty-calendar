import ItemFilterElem from "../ItemFilterElem/ItemFilterElem";
import useViewTransition from "@shared/hooks/useViewTransition";
import useItemStore from "../../store/itemStore";

function ItemFilter() {
  const { activeCategory, changeCategory } = useItemStore();

  const withTransition = useViewTransition();
  const handleClick = (category) => {
    return withTransition(() => changeCategory(category));
  };

  return (
    <div className="flex flex-nowrap items-center px-5 pt-4 pb-2">
      <ItemFilterElem
        isActive={activeCategory === "all"}
        handleClick={handleClick("all")}
      >
        Все
      </ItemFilterElem>
      <ItemFilterElem
        isActive={activeCategory === "operators"}
        handleClick={handleClick("operators")}
      >
        Дежурные
      </ItemFilterElem>
      <ItemFilterElem
        isActive={activeCategory === "services"}
        handleClick={handleClick("services")}
      >
        Оперативные службы
      </ItemFilterElem>
    </div>
  );
}

export default ItemFilter;
