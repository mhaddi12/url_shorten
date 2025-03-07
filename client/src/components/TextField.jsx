import React from "react";

const TextField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-md px-3 py-2 focus:outline-none transition-all 
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
          }`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default TextField;
