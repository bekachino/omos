import React from 'react';
import './input.css';

const Input = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className='input-container'>
      <input type={type || 'text'}
        className={`input ${value?.length ? 'input-has-value' : ''}`}
        name={name}
        value={value?.length ? value : ''}
        onChange={onChange}
        required={required}
      />
      <label className="input-label">{label}</label>
    </div>
  );
};

export default Input;