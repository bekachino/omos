import React, { useEffect } from 'react';
import './troubles.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTroubles } from "../../features/dataThunk";
import { formatDate, formatDuration } from "../../constants";

const Troubles = () => {
  const dispatch = useAppDispatch();
  const { troubles } = useAppSelector(state => state.dataState);
  
  useEffect(() => {
    dispatch(getTroubles());
  }, [dispatch]);
  
  return (
    <div className='troubles'>
      <h1>Новости по авариям</h1>
      <div className='troubles-table-container'>
        <table className='torubles-list'>
          <thead>
          <tr>
            <th>№</th>
            <th>Статус</th>
            <th>Время падения</th>
            <th>Время восставновл.</th>
            <th>Вр. отсуств. сервиса</th>
            <th>Кол-во абонентов</th>
            <th>Квадрат</th>
            <th>Сторона аварии (Элкат/Скайнет)</th>
            <th>Решение</th>
            <th>Причина</th>
          </tr>
          </thead>
          <tbody>
          {
            troubles.map(trouble => (
              <tr key={trouble?.id}>
                <td>{trouble?.id}</td>
                <td>{trouble?.work_status}</td>
                <td>{trouble?.reported_at ? formatDate(trouble?.reported_at) : '-'}</td>
                <td>{trouble?.resolved_at ? formatDate(trouble?.resolved_at) : '-'}</td>
                <td>{trouble?.duration ? formatDuration(trouble?.duration) : '-'}</td>
                <td>{trouble?.subscriber_count}</td>
                <td>{trouble?.location}</td>
                <td>{trouble?.side_accident}</td>
                <td>{trouble?.solution}</td>
                <td>{trouble?.cause}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Troubles;