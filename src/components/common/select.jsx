import React from "react";

const Select = ({ name, label, options, style, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        style={{ width: 400 }}
        className="form-control"
        {...rest}
      >
      <option value="" />
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
      </select>
      {error && (
        <div style={{ width: 400 }} className="alert alert-danger">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
