function ItemFilterElem({ children, isActive, handleClick, disabled }) {
  const disabledStyles = "cursor-none hover:text-primary hover:border-line important:active:opacity-100 line-through";

  return (
    <div
      onClick={disabled ? undefined : handleClick}
      className={`${
        isActive ? "border-active text-active" : "border-line text-primary"
      } ${
        disabled ? disabledStyles : ""
      } border rounded-2xl text-sm font-400 ml-2 first:ml-0 py-1 px-3 active:opacity-50 hover:border-active hover:text-active transition cursor-pointer`}
    >
      {children}
    </div>
  );
}

export default ItemFilterElem;
