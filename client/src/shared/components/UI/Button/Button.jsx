import classes from "./Button.module.css";

function Button({ children, type, className, onClick, withGradient = false }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${
        withGradient ? classes.btn : ""
      } cursor-pointer transition hover:opacity-50 font-400 text-md px-10 py-2 block focus:outline-none rounded-3xl`}
    >
      {children}
    </button>
  );
}

export default Button;
