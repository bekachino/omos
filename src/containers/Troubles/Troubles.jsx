import React, { useEffect, useState } from 'react';
import {
  ReactComponent as PostNewTrouble
} from "../../assets/post-new-trouble.svg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTroubles } from "../../features/dataThunk";
import { formatDate, formatDuration } from "../../constants";
import CreateTroubleForm
  from "../../components/CreateTroubleForm/CreateTroubleForm";
import Button from "../../components/Button/Button";
import './troubles.css';
import { resetAlertMessage } from "../../features/dataSlice";
import Alert from "../../components/Alert/Alert";
import SingleTroubleModal
  from "../../components/SingleTroubleModal/SingleTroubleModal";

const Troubles = () => {
  const dispatch = useAppDispatch();
  const {
    troubles, page_size, troublesTabs, successMessage, errorMessage,
  } = useAppSelector(state => state.dataState);
  const [currentTab, setCurrentTab] = useState(1);
  const [singleTroubleModalOpen, setSingleTroubleModalOpen] = useState(false);
  const [createTroubleModalOpen, setCreateTroubleModalOpen] = useState(false);
  const [currentTrouble, setCurrentTrouble] = useState(null);
  
  useEffect(() => {
    document.body.addEventListener('mousedown', () => {
      dispatch(resetAlertMessage());
    });
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getTroubles({ currentTab, page_size }));
  }, [currentTab, dispatch, page_size]);
  
  useEffect(() => {
    if (successMessage || errorMessage) {
      if (!errorMessage) dispatch(getTroubles({ currentTab, page_size }));
    }
  }, [currentTab, dispatch, errorMessage, page_size, successMessage]);
  
  const tabToPrev = () => {
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };
  
  const tabToNext = () => {
    if (currentTab < troublesTabs[troublesTabs.length - 1]) {
      setCurrentTab(currentTab + 1);
    }
  };
  
  const toggleCreateTroubleModal = () => {
    setCreateTroubleModalOpen(!createTroubleModalOpen);
  }
  
  const toggleSingleTroubleModal = (id) => {
    setSingleTroubleModalOpen(!singleTroubleModalOpen);
    if (id) setCurrentTrouble(id);
  };
  
  return (
    <div className='troubles'>
      <h1>Новости по авариям</h1>
      <div className='troubles-table-container'>
        <div className='troubles-tools'>
          <Alert
            show={!!successMessage || !!errorMessage}
            value={successMessage || errorMessage}
            variant={successMessage ? 'success' : errorMessage ? 'error' : 'default'}
          />
          <Button variant='success'
            onClick={toggleCreateTroubleModal}
            style={{ padding: '18px 75px 14px', marginLeft: 'auto' }}
          >
            <PostNewTrouble/>
            Добавить новость
          </Button>
        </div>
        <table className='troubles-list'>
          <thead>
          <tr>
            <th>№</th>
            <th>Статус</th>
            <th>Время падения</th>
            <th>Время восставновл.</th>
            <th>Вр. отсутств. сервиса</th>
            <th>Кол-во абонентов</th>
            <th>Локация</th>
            <th>Сторона аварии (Элкат/Скайнет)</th>
            <th>Решение</th>
            <th>Причина</th>
          </tr>
          </thead>
          <tbody>
          {troubles.map(trouble => (
            <tr key={trouble?.id}
              onClick={() => toggleSingleTroubleModal(trouble?.id)}
            >
              <td>{trouble?.id}</td>
              <td
                className={trouble?.work_status === 'В процессе Омос' ? 'trouble-status-1' : trouble?.work_status === 'Работа у си' ? 'trouble-status-2' : trouble?.work_status === 'Завершено' ? 'trouble-status-3' : ''}
              >{trouble?.work_status}</td>
              <td>{trouble?.reported_at ? formatDate(trouble?.reported_at) : '-'}</td>
              <td>{trouble?.restore_time ? formatDate(trouble?.restore_time) : '-'}</td>
              <td>{trouble?.duration ? formatDuration(trouble?.duration) : '-'}</td>
              <td>{trouble?.subscriber_count}</td>
              <td>{trouble?.location}</td>
              <td>{trouble?.side_accident}</td>
              <td>{trouble?.solution}</td>
              <td>{trouble?.cause}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className='troubles-pagination-container'>
          <div className='troubles-pagination'>
            <div className='troubles-to-prev-list'
              onClick={tabToPrev}>Пред
            </div>
            <div className='troubles-tab-numbers'>
              {troublesTabs.map((tab) => (
                <React.Fragment key={tab}>
                  {troublesTabs.length > 15 && (
                    currentTab >= 1 && tab > currentTab - 5 && tab < currentTab + 5
                  ) && <div
                    className={`troubles-tab-number ${currentTab === tab ? 'troubles-current-tab' : ''}`}
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                  >{tab}</div>}
                  {troublesTabs.length > 15 && currentTab > 5 && tab === 1 && <>
                    <div
                      className={`troubles-tab-number ${currentTab === tab ? 'troubles-current-tab' : ''}`}
                      key={tab}
                      onClick={() => setCurrentTab(tab)}
                    >{tab}</div>
                    <span> ... </span>
                  </>}
                  {troublesTabs.length > 15 && currentTab < troublesTabs.length - 4 && tab === troublesTabs[troublesTabs.length - 1] && <>
                    <span> ... </span>
                    <div
                      className={`troubles-tab-number ${currentTab === tab ? 'troubles-current-tab' : ''}`}
                      key={tab}
                      onClick={() => setCurrentTab(tab)}
                    >{tab}</div>
                  </>}
                  {troublesTabs.length <= 15 && <div
                    className={`troubles-tab-number ${currentTab === tab ? 'troubles-current-tab' : ''}`}
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                  >{tab}</div>}
                </React.Fragment>
              ))}
            </div>
            <div className='troubles-to-next-list'
              onClick={tabToNext}>След
            </div>
          </div>
        </div>
      </div>
      <CreateTroubleForm
        open={createTroubleModalOpen}
        toggleModal={toggleCreateTroubleModal}
      />
      <SingleTroubleModal
        open={singleTroubleModalOpen}
        toggleModal={toggleSingleTroubleModal}
        troubleId={currentTrouble}
      />
    </div>
  );
};

export default Troubles;