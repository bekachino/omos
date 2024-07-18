import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './createLocationModal.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import { addLocation, getBitrixLocations } from "../../features/dataThunk";
import { regions } from "../../constants";

const CreateLocationModal = ({ open, toggleModal, regionName }) => {
  const dispatch = useAppDispatch();
  const {
    addLocationLoading,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState(null);
  
  useEffect(() => {
    setState({
      area: regionName,
    });
  }, [regionName]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => (
      { ...prevState, [name]: value }
    ));
  };
  
  const onSubmit = async (e) => {
    e?.preventDefault();
    await dispatch(addLocation(state));
    await dispatch(getBitrixLocations(regionName));
    setState(prevState => ({
      ...prevState,
      name: '',
    }));
    toggleModal(false);
  };
  
  return (
    <div
      className='single-trouble-modal-container create-location-modal'
      onClick={e => {
        e.stopPropagation();
        toggleModal(false);
        setState(null);
      }}
      open={open}
    >
      <div className='single-trouble-modal'
        onClick={e => e.stopPropagation()}
      >
        <h3>Создать локацию</h3>
        <form className='create-location-modal-form' onSubmit={onSubmit}>
          <Input label='Название'
            name='name'
            value={state?.name}
            onChange={handleChange}
          />
          <Input
            label='Регион'
            value={regions.filter(region => region.key === regionName)[0]?.value}
            required
            disabled
          />
          <Button
            variant='success'
            style={{ padding: '8px 10px', flexGrow: 5 }}
            type='submit'
            loading={addLocationLoading}
            disabled={!state?.name || !state?.area}
          >
            Добавить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocationModal;