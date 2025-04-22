import classes from "./FileInput.module.css";

function FileInput({
  className,
  children,
  placeholder,
  id,
  type,
  required = "true",
  name,
  ...rest
}) {
  return (
    <div className={className + " " + classes.input}>
      <label htmlFor={id} className="block mb-2 text-sm font-300 text-neutral">
        {children}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="bg-white border border-gray-300 text-neutral text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
        placeholder={placeholder}
        required={required}
        {...rest}
      />
    </div>
  );
}

export default FileInput;
