import React from "react";

const FormInput = ({
  classname,
  type,
  name,
  values,
  handleChange,
  placeholder,
}) => {
  return (
    <div className={`form-row ${classname}`}>
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
