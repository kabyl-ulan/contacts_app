import React from "react";

function Input({
  type,
  onChange,
  name,
  value,
  placeholder,
  required,
  className,
}) {
  return (
    <input
      type={type ? type : "text"}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required ? required : false}
      className={className ? className : "input-text"}
    />
  );
}

export default Input;
