import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './createLocationModal.css';
import Input from "../Input/Input";
import Button from "../Button/Button";

const CreateLocationModal = ({ open, toggleModal }) => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.dataState);
  const [state, setState] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => (
      { ...prevState, [name]: value }
    ));
  };
  
  const onSubmit = async (e) => {
    e?.preventDefault();
  };
  
  return (
    <div
      className='single-trouble-modal-container create-location-modal'
      onClick={e => {
        e.stopPropagation();
        toggleModal(false);
      }}
      open={open}
    >
      <div className='single-trouble-modal'
        onClick={e => e.stopPropagation()}
      >
        {!false ? <>
          <h3>Создать локацию</h3>
          <form className="create-location-modal-form" onSubmit={onSubmit}>
            <Input label='Название'
              name='name'
              value={state?.name}
              onChange={handleChange}
              required
            />
            <Input label='Регион'
              name='area'
              value={state?.area}
              onChange={handleChange}
              required
            />
            <Button
              variant='success'
              style={{ padding: '8px 10px', flexGrow: 5 }}
              type='submit'
              loading={false}
              disabled={!state?.name || !state?.area}
            >
              Добавить
            </Button>
          </form>
        </> : <div className='trouble-modal-loading'/>}
      </div>
    </div>
  );
};

export default CreateLocationModal;