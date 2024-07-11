import React, { useEffect, useState } from 'react';
import './editableParagraph.css';

const EditableParagraph = ({ value, onSubmit, open, required }) => {
  const [state, setState] = useState('');
  
  useEffect(() => {
    setState(value);
  }, [value, open]);
  
  useEffect(() => {
    if (!open) setState('');
  }, [open]);
  
  return (
    <form className='editable-paragraph' onSubmit={e => onSubmit(e, state)}>
      <input className='editable-paragraph-input'
        value={state}
        onChange={(e) => setState(e.target.value)}
        required={required}
      />
      <button type='submit' disabled={state === value || !state}/>
    </form>
  );
};

export default EditableParagraph;