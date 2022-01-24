import { useRef } from "react";

const Input = (props) => {
  const {
    id,
    wrapperClassName = "",
    placeholder = "",
    label = "",
    type = "text",
    error = false,
    errorText = "",

    ...rest
  } = props;

  const inputRef = useRef();

  return (
    <div className={wrapperClassName}>
      <div
        className={` transition duration-150 ease-in-out ${
          error
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary border-gray-gray4"
        }`}
        onClick={() => inputRef.current.focus()}
      >
        <label
          htmlFor={id}
          className="text-dynamic placeholder-gray-gray4 px-2 pt-1.5"
        >
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md"
          id={id}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {errorText && <p className="pl-2 mb-4 text-xs text-red">{errorText}</p>}
    </div>
  );
};

export default Input;
