import React from 'react';
import './textarea.css';

const TextArea = ({ label, name, value, onChange, required }) => {
  return (
    <div className='textarea-container'>
      <textarea
        className={`textarea ${value?.length ? 'textarea-has-value' : ''}`}
        name={name}
        value={value?.length ? value : ''}
        onChange={onChange}
        required={required}
      />
      <label className='textarea-label'>{label}</label>
    </div>
  );
};

export default TextArea;