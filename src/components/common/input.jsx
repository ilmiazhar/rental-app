import React from "react";

const Input = ({ name, label, style, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        style={{width: 400}}
        className="form-control"
      />
      {error && (
        <div style={{width: 400}} className="alert alert-danger">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
