import React from 'react';
import './input.css';

const Input = ({
  label, type, name, value, onChange, onFocus, onBlur, onClick, disabled, ref, autocomplete, required,
}) => {
  return (
    <div className='input-container'>
      <input type={type || 'text'}
        className={`input ${value?.length ? 'input-has-value' : ''}`}
        name={name}
        value={value?.length ? value : ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        ref={ref}
        autoComplete={autocomplete}
      />
      <label className='input-label'>{label}</label>
    </div>
  );
};

export default Input;