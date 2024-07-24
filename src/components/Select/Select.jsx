import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
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
  
  const handleKeyDown = (e) => {
    if (['ArrowDown', 'ArrowUp'].includes(e.key)) setShowOptions(true);
    if (showOptions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, filteredItems().length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault();
        const selectedItem = filteredItems()[focusedIndex];
        onChange({
          target: {
            name, value: selectedItem.props?.value,
          }
        });
        setShowOptions(false);
      }
    }
  };
  
  useEffect(() => {
    const highlightedItem = document.querySelector('.highlighted');
    if (highlightedItem && showOptions && focusedIndex >= 0) {
      highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusedIndex, showOptions]);
  
  return (
    <div className='select' onKeyDown={handleKeyDown}>
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
        onBlur={() => {
          setTimeout(() => setShowOptions(false), 200);
          setFocusedIndex(-1);
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
        role='listbox'
      >
        {!loading ? filteredItems()?.length ? filteredItems()?.map((item, index) => (
            <div
              id={`select-item-${index}`}
              className={`select-item ${item.props?.className} ${index === focusedIndex ? 'highlighted' : ''}`}
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
              role='option'
              aria-selected={index === focusedIndex}
              tabIndex={-1}
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
