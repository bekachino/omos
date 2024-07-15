import React from 'react';
import './button.css';

const Button = ({
  variant,
  type,
  onClick,
  disabled,
  loading,
  style,
  children
}) => {
  return (
    <button className={`button ${loading ? 'loading' : ''}`}
      type={type || 'button'}
      onClick={onClick}
      style={style}
      disabled={disabled || loading}
      variant={variant}
      loading={loading}
    >
      {!loading && children}
    </button>
  );
};

export default Button;