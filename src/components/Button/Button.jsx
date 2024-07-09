import React from 'react';
import './button.css';

const Button = ({ variant, type, onClick, disabled, style, children }) => {
  return (
    <button className='button'
      type={type || 'button'}
      onClick={onClick}
      style={style}
      disabled={disabled}
      variant={variant}
    >
      {children}
    </button>
  );
};

export default Button;