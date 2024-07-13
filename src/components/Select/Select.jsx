import React, { useRef, useState } from 'react';
import { ReactComponent as SelectArrow } from "../../assets/select-arrow.svg";
import './select.css';

const Select = ({
  label, type, name, onChange, required, loading, children
}) => {
  const inputRef = useRef(null);
  const [currentValue, setCurrentValue] = useState('');
  
  const onFocus = () => inputRef.current.focus();
  
  return (
    <div
      className='select-container'
      onClick={onFocus}
    >
      <input type={type || 'text'}
        className='select-input'
        name={name}
        value={currentValue}
        placeholder={label}
        ref={inputRef}
        required={required}
        autoComplete='off'
        onChange={e => setCurrentValue(e.target.value)}
      />
      <div className='select-toggler'>
        <div className='select-arrow'><SelectArrow/></div>
      </div>
      <div className='select-options'>
        {loading ? <div
          className='select-option'
        >
          Загрузка...
        </div> : children.map((item) => (
          item.props?.children?.toLowerCase().includes(currentValue?.toLowerCase()) &&
          <div
            className={item.props?.className}
            value={item.props?.value}
            onMouseDown={() => {
              setCurrentValue(item.props?.children);
              onChange({
                target: {
                  name: name || '', value: item.props?.value
                }
              });
              inputRef.current.blur();
            }}
          >
            {item.props?.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;