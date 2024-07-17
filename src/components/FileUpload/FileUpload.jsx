import React, { useRef } from 'react';
import './fileUpload.css';
import Button from "../Button/Button";

const FileUpload = ({ handleFileChange, removeImage, file, label }) => {
  const inputRef = useRef(null);
  
  const onFileChange = (e) => {
    if (handleFileChange) {
      handleFileChange(e);
    }
  };
  
  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  return (
    <div className='file-upload'>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <div className='form-images'>
        {file ? <span className='image-labels'>
              <img
                className='img-preview'
                src={URL.createObjectURL(file)}
                alt={label}
                loading='lazy'
              />
            </span> : label}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'stretch'
        }}>
        {!file ? <Button
          type='button'
          variant='success'
          onClick={activateInput}
          style={{ padding: '2px 5px' }}
        >
          Загрузить
        </Button> : <Button
          type='button'
          variant='error'
          style={{ padding: '2px 5px' }}
          onClick={() => {
            if (removeImage && inputRef.current) {
              removeImage();
              inputRef.current.value = '';
              inputRef.current.src = null;
            }
          }}
        >Удалить</Button>}
      </div>
    </div>
  );
};

export default FileUpload;
