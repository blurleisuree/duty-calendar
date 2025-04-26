import classes from "./Button.module.css";

function Button({ children, type, className, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${classes.btn} cursor-pointer text-white transition hover:opacity-50 font-400 text-sm px-10 py-2 block focus:outline-none `}
    >
      {children}
    </button>
  );
}

export default Button;
