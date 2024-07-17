import React, { useEffect, useState } from 'react';
import './createTroubleForm.css';
import Input from "../Input/Input";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getBitrixLocations,
  getIncidentTypes,
  getLocations,
  getWorkers,
  getWorkTypes,
  postTrouble
} from "../../features/dataThunk";
import { locationTypes, regions } from "../../constants";
import FileUpload from "../FileUpload/FileUpload";
import CreateLocationModal from "../CreateLocationModal/CreateLocationModal";

const CreateTroubleForm = ({ open, toggleModal }) => {
  const dispatch = useAppDispatch();
  const {
    incident_types,
    incidentTypesLoading,
    work_types,
    locations,
    locationsLoading,
    bitrixLocations,
    bitrixLocationsLoading,
    workers,
    workersLoading,
    createTroubleLoading,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [pickedLocations, setPickedLocations] = useState([]);
  const [currentRegion, setCurrentRegion] = useState('');
  const [createLocationModalOpen, setCreateLocationModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(getIncidentTypes());
    dispatch(getWorkTypes());
    dispatch(getWorkers());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getBitrixLocations(currentRegion));
  }, [currentRegion, dispatch]);
  
  useEffect(() => {
    if (state?.post_type) {
      setAddresses([]);
      dispatch(getLocations(state?.post_type));
    }
  }, [dispatch, state?.post_type]);
  
  const handleChange = e => setState({
    ...state, [e.target.name]: e.target.value
  });
  
  const handleLocationsChange = e => {
    if (!pickedLocations.includes(e.target.value)) {
      setPickedLocations([...pickedLocations, e.target.value]);
    }
  };
  
  const handleAddressesChange = e => {
    if (!addresses.includes(e.target.value)) {
      setAddresses([...addresses, e.target.value]);
    }
  };
  
  const handleCurrentRegionChange = e => {
    setCurrentRegion(e.target.value);
    setPickedLocations([]);
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
  
  const toggleCreateLocationModal = (value) => setCreateLocationModalOpen(value);
  
  const onPickedLocationClick = (locationId) => {
    const filteredAddresses = addresses.filter(address => address !== locationId);
    setAddresses(filteredAddresses);
  };
  
  const onPickedBitrixLocationClick = (locationName) => {
    const filteredAddresses = pickedLocations.filter(location => location !== locationName);
    setPickedLocations(filteredAddresses);
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    await dispatch(postTrouble({
      addresses, ...state, locations: pickedLocations,
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
        <Select label='Выберите область'
          onChange={handleCurrentRegionChange}
          value={currentRegion}
        >
          {regions?.map((type) => (
            <div
              value={type?.key}
              key={type?.key}
            >{type?.value}</div>
          ) || [])}
        </Select>
        {currentRegion && <>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', }}>
            <Button variant='success'
              onClick={() => toggleCreateLocationModal(true)}
              style={{ minWidth: '30px', height: '30px', minHeight: 'unset', fontSize: '20px' }}
            >+</Button>
            <Select
              label='Битрикс локации'
              name='locations'
              onChange={handleLocationsChange}
              loading={bitrixLocationsLoading}
            >
              {bitrixLocations?.map((type) => (
                <div
                  className='select-option'
                  value={type?.name}
                  key={type?.name}
                >{type?.name}</div>
              ) || [])}
            </Select>
          </div>
          <div className='picked-locations'>
            {bitrixLocations?.map((location) => (
              pickedLocations?.includes(location.name) && <span
                className='picked-location'
                onClick={() => onPickedBitrixLocationClick(location.name)}
                key={location.name}
              >
              {location.name} &#10005;
            </span>
            ))}
          </div>
        </>}
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
        />
        <Input label='Порт'
          name='port'
          value={state?.port}
          onChange={handleChange}
        />
        <Select
          label='Ответственный'
          name='responsible'
          value={state?.responsible}
          options={workers}
          onChange={handleChange}
          loading={workersLoading}
          required
        >
          {workers.map((type) => (
            <div
              className='select-option'
              value={type?.value}
              key={type?.value}
            >{type?.key}</div>
          ))}
        </Select>
        <Select
          label='Причина'
          name='incident_type'
          value={state?.incident_type}
          options={incident_types}
          onChange={handleChange}
          loading={incidentTypesLoading}
          required
        >
          {incident_types.map((type) => (
            <div
              className='select-option'
              value={type?.key}
              key={type?.key}
            >{type?.value}</div>
          ))}
        </Select>
        {state?.incident_type === 'maintenance' && <Input label='Длительность'
          name='work_duration'
          value={state?.work_duration}
          onChange={handleChange}
          required
        />}
        {state?.incident_type === 'maintenance' && <Select label='Тип работы'
          name='work_type'
          value={state?.work_type}
          options={work_types}
          onChange={handleChange}
          required
        >
          {work_types.map((type) => (
            <div
              className='select-option'
              value={type?.key}
              key={type?.key}
            >{type?.value}</div>
          ))}
        </Select>}
        <Select
          label='Тип локации'
          name='post_type'
          value={state?.post_type}
          options={incident_types}
          onChange={handleChange}
          required
        >
          {locationTypes.map((location) => (
            <div
              className='select-option'
              value={location?.key}
              key={location?.key}
            >{location?.value}</div>
          ))}
        </Select>
        {state?.post_type && <Select label='Локации для абонентского приложения'
          name='locations'
          onChange={handleAddressesChange}
          loading={locationsLoading}
        >
          {locations.map((type) => (
            <div
              className='select-option'
              value={type?.id}
              key={type?.id}
            >{type?.name}</div>
          ))}
        </Select>}
        <div className='picked-locations'>
          {locations.map((location) => (
            addresses?.includes(location.id) && <span
              className='picked-location'
              onClick={() => onPickedLocationClick(location.id)}
              key={location.id}
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
        <TextArea label='Текст абонентского'
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
              setCurrentRegion('');
            }}
          >
            Отмена
          </Button>
          <Button
            variant='success'
            style={{ padding: '8px 10px', flexGrow: 5 }}
            type='submit'
            loading={createTroubleLoading}
            disabled={!addresses?.length || !pickedLocations?.length}
          >
            Добавить
          </Button>
        </div>
      </form>
      <CreateLocationModal
        toggleModal={toggleCreateLocationModal}
        open={createLocationModalOpen}
        regionName={currentRegion}
      />
    </div>
  );
};

export default CreateTroubleForm;