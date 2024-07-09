import React, { useRef } from 'react';

const FileUpload = ({ handleFileChange, removeImage, file, label, isByte }) => {
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
    <>
      <input
        type='file'
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />
      <div>
        <div>
          <div className='form-images'>
            {file ? <span className='image-labels'>
              <img
                className='new-good-img-preview'
                src={isByte ? file : URL.createObjectURL(file)}
                alt={label}
                loading='lazy'
              />
            </span> : label}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'stretch'
          }}>
          {!file ? <button
            type='button'
            onClick={activateInput}
            style={{ fontSize: '10px' }}>
            Загрузить
          </button> : <button
            type='button'
            className='good-form-delete-image'
            onClick={() => {
              if (removeImage && inputRef.current) {
                removeImage();
                inputRef.current.value = '';
              }
            }}
          />}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
