import React, { useEffect, useState } from 'react';
import './createTroubleForm.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getIncidentTypes, getLocations, getWorkTypes, postTrouble
} from "../../features/dataThunk";
import { locationTypes } from "../../constants";
import FileUpload from "../FileUpload/FileUpload";

const CreateTroubleForm = ({ open, toggleModal }) => {
  const dispatch = useAppDispatch();
  const {
    incident_types, work_types, locations, locationsLoading,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState({
    location: 'test location',
    subscriber_count: '100',
    olt: 'test olt',
    port: 'test port',
    work_duration: '10 часов',
    incident_type: 'maintenance',
    work_type: 'expansion',
    description: 'test description',
    title: 'test title',
    post_type: 'dist',
  });
  const [addresses, setAddresses] = useState([1, 2]);
  
  useEffect(() => {
    dispatch(getIncidentTypes());
    dispatch(getWorkTypes());
  }, [dispatch]);
  
  useEffect(() => {
    if (state?.post_type) {
      setAddresses([]);
      dispatch(getLocations(state?.post_type));
    }
  }, [dispatch, state?.post_type]);
  
  const handleChange = e => setState({
    ...state, [e.target.name]: e.target.value
  });
  
  const handleAddressesChange = e => {
    if (!addresses.includes(e.target.value)) {
      setAddresses([...addresses, e.target.value]);
    }
  };
  
  const handleFileChange = (e) => {
    setState((prevState) => (
      {
        ...prevState, image: e.target.files[0],
      }
    ));
  };
  
  const removeImage = () => {
    setState((prevState) => (
      {
        ...prevState, image: null,
      }
    ));
  };
  
  const onPickedLocationClick = (locationId) => {
    const filteredAddresses = addresses.filter(address => address !== locationId);
    setAddresses(filteredAddresses);
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(postTrouble({
      addresses, ...state,
    }));
    toggleModal();
    setState(null);
    setAddresses([]);
  };
  
  return (
    <div className='create-trouble-form-container'
      onClick={toggleModal}
      open={open}
    >
      <form className='create-trouble-form'
        onClick={e => e.stopPropagation()}
        onSubmit={onSubmit}>
        <h3>Добавление новости</h3>
        <Input label='Название'
          name='title'
          value={state?.title}
          onChange={handleChange}
          required
        />
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
        <Select label='Причина'
          name='incident_type'
          value={state?.incident_type}
          options={incident_types}
          onChange={handleChange}
          required
        >
          {incident_types.map((type) => (
            <div className='select-option'
              value={type?.key}>{type?.value}</div>
          ))}
        </Select>
        {
          state?.incident_type === 'maintenance' &&
          <Input label='Длительность'
            name='work_duration'
            value={state?.work_duration}
            onChange={handleChange}
            required
          />
        }
        {state?.incident_type === 'maintenance' && <Select label='Тип работы'
          name='work_type'
          value={state?.work_type}
          options={work_types}
          onChange={handleChange}
          required
        >
          {work_types.map((type) => (
            <div className='select-option'
              value={type?.key}>{type?.value}</div>
          ))}
        </Select>}
        <Select label='Тип локации'
          name='post_type'
          value={state?.post_type}
          options={incident_types}
          onChange={handleChange}
          required
        >
          {locationTypes.map((location) => (
            <div className='select-option'
              value={location?.key}>{location?.value}</div>
          ))}
        </Select>
        {state?.post_type && <Select label='Локации'
          name='locations'
          options={locations}
          onChange={handleAddressesChange}
          loading={locationsLoading}
        >
          {locations.map((type) => (
            <div className='select-option'
              value={type?.id}>{type?.name}</div>
          ))}
        </Select>}
        <div className='picked-locations'>
          {locations.map((location) => (
            addresses.includes(location.id) && <span
              className='picked-location'
              onClick={() => onPickedLocationClick(location.id)}
            >
              {location.name} &#10005;
            </span>
          ))}
        </div>
        <TextArea label='Описание'
          name='description'
          value={state?.description}
          onChange={handleChange}
          required
        />
        <TextArea label='Скрипт'
          name='text'
          value={state?.text}
          onChange={handleChange}
          required
        />
        <FileUpload handleFileChange={handleFileChange}
          file={state?.image}
          removeImage={removeImage}
          label='загрузите фото'
        />
        <div className='create-trouble-form-btns'>
          <Button
            variant='error'
            style={{ padding: '8px 10px', flexGrow: 1 }}
            onClick={() => {
              toggleModal();
              setState(null);
              setAddresses([]);
            }}
          >
            Отмена
          </Button>
          <Button
            variant='success'
            style={{ padding: '8px 10px', flexGrow: 5 }}
            type='submit'
          >
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTroubleForm;