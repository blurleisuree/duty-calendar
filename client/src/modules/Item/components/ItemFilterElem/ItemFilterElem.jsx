function ItemFilterElem({ children, isActive, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? "border-active text-active" : "border-line text-primary"
      } border rounded-2xl text-sm font-400 ml-2 first:ml-0 py-1 px-3 active:opacity-50 hover:border-active hover:text-active transition cursor-pointer`}
    >
      {children}
    </div>
  );
}

export default ItemFilterElem;
