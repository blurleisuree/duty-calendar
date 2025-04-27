function HeaderButton({ src, handleClick, className, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      onClick={handleClick}
      className={`${className} cursor-pointer p-1 box-content active:opacity-40 transition`}
    />
  );
}

export default HeaderButton;
