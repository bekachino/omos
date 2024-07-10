import React from 'react';
import './alert.css';

const Alert = ({ variant, value, show }) => {
  return (
    <div className={`alert ${show ? 'alert-shown' : ''}`} variant={variant || 'default'}>
      {value || ''}
    </div>
  );
};

export default Alert;