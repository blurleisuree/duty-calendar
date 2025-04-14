function Input({ className, children, placeholder, id, type, required = "true", name, ...rest }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-primary"
      >
        {children}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="bg-gray-50 border border-gray-300 text-neutral text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
        {...rest}
      />
    </div>
  );
}

export default Input;
