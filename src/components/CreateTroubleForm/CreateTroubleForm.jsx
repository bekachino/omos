import React, { useState } from 'react';
import './createTroubleForm.css';
import Input from "../Input/Input";
import Button from "../Button/Button";

const CreateTroubleForm = ({ open, toggleModal }) => {
  const [state, setState] = useState(null);
  
  const handleChange = e => setState({
    ...state, [e.target.name]: e.target.value
  });
  
  return (
    <div className='create-trouble-form-container'
      onClick={toggleModal}
      open={open}
    >
      <form className='create-trouble-form' onClick={e => e.stopPropagation()}>
        <h3>Добавление новости</h3>
        <Input label='Локация'
          name='location'
          value={state?.location}
          onChange={handleChange}
          required
        />
        <Input label='Кол-во абонентов'
          name='subscriber_count'
          value={state?.subscriber_count}
          onChange={handleChange}
          required
        />
        <Input label='ОЛТ'
          name='olt'
          value={state?.olt}
          onChange={handleChange}
          required
        />
        <Input label='Порт'
          name='port'
          value={state?.port}
          onChange={handleChange}
          required
        />
        <div className="create-trouble-form-btns">
          <Button
            variant='error'
            style={{ padding: '8px 10px', flexGrow: 1 }}
            onClick={toggleModal}
          >
            Отмена
          </Button>
          <Button variant='success' style={{ padding: '8px 10px',  flexGrow: 5 }}>
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTroubleForm;