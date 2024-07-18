import React, { useCallback, useEffect, useRef, useState, } from 'react';
import Input from "../Input/Input";
import { ReactComponent as SelectArrow } from "../../assets/select-arrow.svg";
import './select.css';

const Select = ({
  name,
  value,
  label,
  onChange,
  loading,
  dontClearOnFocus,
  manualEditable,
  children
}) => {
  const inputRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  
  useEffect(() => {
    const toggle = () => {
      setShowOptions(false);
    };
    
    document.addEventListener('mousedown', toggle);
    return () => document.removeEventListener('mousedown', toggle);
  }, [showOptions]);
  
  const filteredItems = useCallback(() => {
    if (currentValue?.length) {
      return children?.filter(option => option.props?.children.toLowerCase().includes(currentValue?.toLowerCase()));
    }
    return children;
  }, [children, currentValue]);
  
  return (
    <div className='select'>
      <Input
        type='text'
        value={currentValue}
        onChange={e => {
          setShowOptions(true);
          if (manualEditable) {
            onChange({
              target: {
                name, value: e.target.value,
              }
            });
          } else setCurrentValue(e.target.value);
        }}
        label={label}
        onFocus={() => {
          setShowOptions(true);
          if (!dontClearOnFocus) {
            onChange({
              target: {
                name, value: '',
              }
            });
          }
          setShowOptions(true);
        }}
        ref={inputRef}
      />
      <div className={`select-toggler ${showOptions ? 'select-toggler-focused' : ''}`}>
        <div className='select-arrow'><SelectArrow/></div>
      </div>
      <div
        className='select-items'
        style={{ display: showOptions ? 'flex' : 'none' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {!loading ? filteredItems()?.length ? filteredItems()?.map((item) => (
            <div
              className={'select-item ' + item.props?.className}
              value={item.props?.value}
              key={item.props?.value}
              onClick={() => {
                onChange({
                  target: {
                    name, value: item.props?.value,
                  }
                });
                if (item.props?.onClick) item.props?.onClick(null, item.props?.value);
                setShowOptions(false);
              }}
            >
              {item.props?.children}
            </div>
          )) : <div className='select-item'
            onClick={() => setShowOptions(false)}><em>Не найдено...</em></div> :
          <div className='select-item'
            onClick={() => setShowOptions(false)}><em>Загрузка...</em></div>}
      </div>
    </div>
  );
};

export default Select;
