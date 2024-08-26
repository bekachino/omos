import React, { useEffect, useState } from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getCities,
  getDistricts,
  getHouses,
  getIncidentTypes,
  getLocations,
  getRegions,
  getStreets,
  getWorkers,
  getWorkTypes,
  postTrouble
} from "../../features/dataThunk";
import { locationTypes } from "../../constants";
import FileUpload from "../FileUpload/FileUpload";
import './createTroubleForm.css';

const CreateTroubleForm = ({
  open,
  toggleModal
}) => {
  const dispatch = useAppDispatch();
  const {
    regions,
    regionsLoading,
    cities,
    citiesLoading,
    districts,
    districtsLoading,
    streets,
    houses,
    housesLoading,
    streetsLoading,
    incident_types,
    incidentTypesLoading,
    work_types,
    locations,
    locationsLoading,
    workers,
    workersLoading,
    createTroubleLoading,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [housesInsteadOfStreet, setHousesInsteadOfStreet] = useState([]);
  const [housesList, setHousesList] = useState([]);
  
  useEffect(() => {
    dispatch(getRegions());
    dispatch(getIncidentTypes());
    dispatch(getWorkTypes());
    dispatch(getWorkers());
  }, [dispatch]);
  
  useEffect(() => {
    if (state?.post_type) {
      setAddresses([]);
      dispatch(getLocations(state?.post_type));
    }
  }, [
    dispatch,
    state?.post_type
  ]);
  
  const handleChange = e => setState(prevState => (
    {
      ...prevState,
      [e.target.name]: e.target.value,
    }
  ));
  
  const handleAddressChange = e => {
    const {
      name,
      value
    } = e.target;
    let finalValue = '';
    
    if (name === 'region') {
      finalValue = regions.filter(region => region?.hydra_id === value)[0];
      if (value) {
        dispatch(getCities(value));
      } else {
        setHousesInsteadOfStreet([]);
        setHousesList([]);
        return setState(prevState => (
          {
            ...prevState,
            region: null,
            city: null,
            district: null,
            street: null
          }
        ));
      }
    } else if (name === 'city') {
      finalValue = cities.filter(city => city?.hydra_id === value)[0];
      if (value) {
        dispatch(getDistricts(value));
      } else {
        setHousesInsteadOfStreet([]);
        setHousesList([]);
        return setState(prevState => (
          {
            ...prevState,
            city: null,
            district: null,
            street: null
          }
        ));
      }
    } else if (name === 'district') {
      finalValue = districts.filter(district => district?.hydra_id === value)[0];
      if (value) {
        dispatch(getStreets(value));
      } else {
        setHousesInsteadOfStreet([]);
        setHousesList([]);
        return setState(prevState => (
          {
            ...prevState,
            district: null,
            street: null
          }
        ));
      }
    } else if (name === 'street') {
      finalValue = streets.filter(street => street?.hydra_id === value)[0];
      if (value) {
        if (finalValue?.name?.slice(0, 3) === 'д. ') {
          setHousesInsteadOfStreet(prevState => (
            [
              ...prevState,
              finalValue
            ]
          ));
        } else dispatch(getHouses(value));
      } else {
        setHousesInsteadOfStreet([]);
        setHousesList([]);
        return setState(prevState => (
          {
            ...prevState,
            street: null
          }
        ));
      }
    }
    
    setState(prevState => (
      {
        ...prevState,
        [name]: finalValue,
      }
    ));
  };
  
  const handleAddressesChange = e => {
    if (typeof e.target.value === 'string') return;
    if (!addresses.includes(e.target.value)) {
      setAddresses([
        ...addresses,
        e.target.value
      ]);
    }
  };
  
  const handleFileChange = (e) => {
    setState((prevState) => (
      {
        ...prevState,
        image: e.target.files[0],
      }
    ));
  };
  
  const removeImage = () => {
    setState((prevState) => (
      {
        ...prevState,
        image: null,
      }
    ));
  };
  
  const onPickedLocationClick = (locationId) => {
    const filteredAddresses = addresses.filter(address => address !== locationId);
    setAddresses(filteredAddresses);
  };
  
  const onHouseClick = (e) => {
    const { value } = e.target;
    if ([...housesList].filter(house => house?.hydra_id === value).length) return;
    const pickedHouse = [...houses]?.filter(house => house?.hydra_id === value);
    setHousesList(prevState => (
      [
        ...prevState,
        ...pickedHouse
      ]
    ));
  };
  
  const onHouseButNoStreetClick = (e) => {
    const { value } = e.target;
    if ([...housesInsteadOfStreet].filter(house => house?.hydra_id === value).length) return;
    const pickedHouse = [...streets]?.filter(house => house?.hydra_id === value);
    if (pickedHouse?.[0]?.name?.slice(0, 3) === 'ул.') {
      setState(prevState => (
        {
          ...prevState,
          street: pickedHouse[0],
        }
      ));
      dispatch(getHouses(value));
    } else {
      setHousesList([]);
      setState(prevState => (
        {
          ...prevState,
          street: null,
        }
      ));
      setHousesInsteadOfStreet(prevState => (
        [
          ...prevState,
          ...pickedHouse
        ]
      ));
    }
  };
  
  const onHouseDelete = (name, houseId) => {
    if (name === 'houses') {
      const updatedVersion = [...housesList]?.filter(item => item?.id !== houseId);
      setHousesList(updatedVersion);
    } else if (name === 'housesInsteadOfStreet') {
      const updatedVersion = [...housesInsteadOfStreet]?.filter(item => item?.id !== houseId);
      setHousesInsteadOfStreet(updatedVersion);
    }
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    const street = state?.district && (
      state?.district?.name?.includes('ул.') || state?.district?.name?.includes('мкр.')
    ) ? state?.street?.name ? state?.street : housesInsteadOfStreet?.length ? housesInsteadOfStreet : streets : state?.street;
    await dispatch(postTrouble({
      addresses, ...state,
      houses: state?.street && street ? housesList.length ? housesList : null : [],
      street,
    }));
    toggleModal();
    setState(null);
    setAddresses([]);
    setHousesList([]);
    setHousesInsteadOfStreet([]);
  };
  
  return (
    <div
      className='create-trouble-form-container'
      onClick={toggleModal}
      open={open}
    >
      <form
        className='create-trouble-form'
        onClick={e => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <h3>Добавление новости</h3>
        <Input
          label='Название'
          name='title'
          value={state?.title}
          onChange={handleChange}
          required
        />
        <Select
          label='Выберите область'
          name='region'
          value={state?.region?.name}
          onChange={handleAddressChange}
          loading={regionsLoading}
          required
        >
          {regions?.map((region, i) => (
            <div
              value={region?.hydra_id}
              key={i}
            >{region?.name}</div>
          ) || [])}
        </Select>
        {state?.region && <Select
          label='Город/Район'
          name='city'
          value={state?.city?.name}
          onChange={handleAddressChange}
          loading={citiesLoading}
        >
          {cities?.map((location, i) => (
            <div
              className='select-option'
              value={location?.hydra_id}
              key={i}
            >{location?.name}</div>
          ) || [])}
        </Select>}
        {state?.city && <Select
          label='Мкр/Ж-в/Село/Улица'
          name='district'
          value={state?.district?.name}
          onChange={handleAddressChange}
          loading={districtsLoading}
        >
          {districts?.map((location, i) => (
            <div
              className='select-option'
              value={location?.hydra_id}
              key={i}
            >{location?.name}</div>
          ) || [])}
        </Select>}
        {state?.district && <>
          <Select
            label='Улица/Дом'
            name='street'
            value={state?.street?.name}
            onChange={onHouseButNoStreetClick}
            loading={streetsLoading}
          >
            {streets?.map((location, i) => (
              <div
                className='select-option'
                value={location?.hydra_id}
                key={i}
              >{location?.name}</div>
            ) || [])}
          </Select>
          <div className='picked-locations'>
            {housesInsteadOfStreet?.map((location) => (
              <span
                className='picked-location'
                onClick={() => onHouseDelete('housesInsteadOfStreet', location?.id)}
                key={location?.id}
              >
                {location.name} &#10005;
              </span>
            ))}
          </div>
        </>}
        {state?.street && !!houses?.length && <>
          <Select
            label='Дома'
            value={state?.house?.name}
            onChange={onHouseClick}
            loading={housesLoading}
          >
            {houses?.map((location, i) => (
              <div
                className='select-option'
                value={location?.hydra_id}
                key={i}
              >{location?.name}</div>
            ) || [])}
          </Select>
          <div className='picked-locations'>
            {housesList?.map((location) => (
              <span
                className='picked-location'
                onClick={() => onHouseDelete('houses', location?.id)}
                key={location?.id}
              >
              {location.name} &#10005;
            </span>
            ))}
          </div>
        </>}
        <Input
          label='Кол-во абонентов'
          type='number'
          name='subscriber_count'
          value={state?.subscriber_count}
          onChange={handleChange}
          required
        />
        <Input
          label='ОЛТ'
          name='olt'
          value={state?.olt}
          onChange={handleChange}
        />
        <Input
          label='Порт'
          name='port'
          value={state?.port}
          onChange={handleChange}
        />
        <Select
          label='Ответственный'
          name='responsible'
          value={workers?.filter(worker => worker.value === state?.responsible)[0]?.key}
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
          value={incident_types?.filter(worker => worker.key === state?.incident_type)[0]?.value}
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
        {state?.incident_type === 'maintenance' && <Input
          label='Длительность'
          name='work_duration'
          value={state?.work_duration}
          onChange={handleChange}
          required
        />}
        {state?.incident_type === 'maintenance' && <Select
          label='Тип работы'
          name='work_type'
          value={work_types?.filter(worker => worker.key === state?.work_type)[0]?.value}
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
          value={locationTypes?.filter(worker => worker.key === state?.post_type)[0]?.value}
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
        {state?.post_type && <Select
          label='Локации для абонентского приложения'
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
        <TextArea
          label='Описание'
          name='description'
          value={state?.description}
          onChange={handleChange}
          required
        />
        <TextArea
          label='Текст абонентского'
          name='text'
          value={state?.text}
          onChange={handleChange}
          required
        />
        <FileUpload
          handleFileChange={handleFileChange}
          file={state?.image}
          removeImage={removeImage}
          label='загрузите фото'
        />
        <div className='create-trouble-form-btns'>
          <Button
            variant='error'
            style={{
              padding: '8px 10px',
              flexGrow: 1
            }}
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
            style={{
              padding: '8px 10px',
              flexGrow: 5
            }}
            type='submit'
            loading={createTroubleLoading}
            disabled={!addresses?.length}
          >
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTroubleForm;
