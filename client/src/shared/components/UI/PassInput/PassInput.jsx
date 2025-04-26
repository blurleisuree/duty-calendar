import classes from "./PassInput.module.css";
import { useEffect, useState } from "react";
import eyeOpen from "@assets/icons/eyeOpen.svg";
import eyeClose from "@assets/icons/eyeClose.svg";

function PassInput({
  register = function () {},
  errors,
  className,
  children,
  placeholder,
  id,
  name,
  ...rest
}) {
  const [isShowPass, setIsShowPass] = useState(false);

  const toggleIsShowPass = () => {
    setIsShowPass(!isShowPass);
  };

  useEffect(() => {
    setIsShowPass(false);
  }, [setIsShowPass]);

  return (
    <div className={className} htmlFor={name}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-300 text-neutral"
        >
          {children}
        </label>
        <img
          src={isShowPass ? eyeClose : eyeOpen}
          alt="eye"
          className="w-6  cursor-pointer p-1 box-content"
          onClick={toggleIsShowPass}
        />
      </div>
      <input
        type={isShowPass ? "text" : "password"}
        id={id}
        name={name}
        className="bg-white border border-gray-300 py-3 pl-3 text-neutral text-md rounded-lg outline-0 transition focus:ring-active focus:border-active block w-full"
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
      {errors && (
        <span className="text-sm mt-3 block text-red-600">{errors.message}</span>
      )}
    </div>
  );
}

export default PassInput;
