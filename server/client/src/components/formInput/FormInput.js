import React from "react";

const FormInput = ({ type, name, values, handleChange, placeholder }) => {
  return (
    <div className="form-row">
      <input
        type={type}
        name={name}
        value={values}
        onChange={handleChange}
        className="form-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
