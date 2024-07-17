import React, { useCallback, useEffect, useState } from 'react';
import Input from "../Input/Input";
import { ReactComponent as SelectArrow } from "../../assets/select-arrow.svg";
import './select.css';

const Select = ({ name, value, label, onChange, loading, children }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);
  
  useEffect(() => {
    const toggle = e => {
      setShowOptions(false);
    };
    
    document.addEventListener('mousedown', toggle);
    return () => document.removeEventListener('mousedown', toggle);
  }, [showOptions]);
  
  const filteredItems = useCallback(() => {
    return children?.filter(option => option.props?.children.toLowerCase().includes(currentValue?.toLowerCase()));
  }, [children, currentValue]);
  
  return (
    <div className='select'>
      <Input
        type='text'
        value={currentValue}
        onChange={e => {
          setShowOptions(true);
          setCurrentValue(e.target.value);
        }}
        label={label}
        onFocus={() => {
          setShowOptions(true);
          onChange({
            target: {
              name, value: '',
            }
          });
          setShowOptions(true);
        }}
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
            item.props?.children?.toLowerCase().includes(currentValue?.toLowerCase() || '') &&
            <div
              className={'select-item ' + item.props?.className}
              value={item.props?.value}
              key={item.props?.value}
              onClick={() => {
                onChange({
                  target: {
                    name, value: item.props?.children,
                  }
                });
                setShowOptions(false);
              }}
            >
              {item.props?.children}
            </div>
          )) : <div className='select-item'
            onClick={() => setShowOptions(false)}>Не найдено...</div> :
          <div className='select-item'
            onClick={() => setShowOptions(false)}>Загрузка...</div>}
      </div>
    </div>
  );
};

export default Select;
