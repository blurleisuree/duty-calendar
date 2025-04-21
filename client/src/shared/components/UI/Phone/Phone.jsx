function Phone({ className, children }) {
  return (
    <a
      href={"tel:" + children}
      className={`${className} text-active underline cursor-pointer text-lg `}
    >
      {children}
    </a>
  );
}

export default Phone;
