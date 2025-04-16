function Button({ children, type, className, onClick }) {
  return (
    <button
    onClick={onClick}
      type={type}
      className={`${className} cursor-pointer text-primary bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
    >
      {children}
    </button>
  );
}

export default Button;
