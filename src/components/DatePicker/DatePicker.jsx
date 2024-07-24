import React, { useState } from 'react';
import moment from "moment";
import Select from "../Select/Select";
import './datePicker.css';

const DatePicker = ({ date1, date2, changeHandler }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  
  const calendar = [];
  const years = [];
  
  const startDay = currentDate.clone().startOf('month').startOf('week');
  const endDay = currentDate.clone().endOf('month').endOf('week');
  const day = startDay.clone();
  
  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, 'day');
  }
  
  while (moment(years[years.length - 1] || 2016, 'YYYY').isBefore('2024', 'YYYY')) {
    years.push(years.length ? years[years.length - 1] + 1 : 2016);
    day.add(1, 'day');
  }
  
  const currentMonthName = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');
  
  const updateYear = e => {
    const { value } = e.target;
    setCurrentDate(currentDate.clone().year(value));
  };
  
  const updateMonth = e => {
    const { value } = e.target;
    setCurrentDate(currentDate.clone().month(value));
  };
  
  return (
    <div className='date-picker'>
      <div style={{ display: 'flex', justifyContent: "center", gap: '17px' }}>
        <Select
          value={currentMonthName}
          name='month'
          onChange={updateMonth}
          style={{ minWidth: '125px' }}>
          {moment.months()?.map((type, i) => (
            <div
              className='select-option'
              value={type}
              key={i}
            >{type}</div>
          ) || [])}
        </Select>
        <Select
          value={currentYear}
          name='year'
          onChange={updateYear}
          style={{ minWidth: '80px' }}
          dontClearOnFocus
        >
          {years?.map((type, i) => (
            <div
              className='select-option'
              value={type.toString()}
              key={i}
            >{type.toString()}</div>
          ) || [])}
        </Select>
      </div>
      <div className='week-names'>
        <span>Пн</span>
        <span>Вт</span>
        <span>Ср</span>
        <span>Чт</span>
        <span>Пт</span>
        <span>Сб</span>
        <span>Вс</span>
      </div>
      <div className='month-days'>
        {calendar.map((day, i) => (
          <div
            className={`month-day ${date1 === day.format('DD.MM.YYYY') || date2 === day.format('DD.MM.YYYY') ? 'month-day-selected' : ''} ${(
              () => {
                if (date1 && date2 && moment(date1, 'DD.MM.YYYY').isSame(day)) {
                  if (moment(date1, 'DD.MM.YYYY').isBefore(moment(date2, 'DD.MM.YYYY'))) {
                    return 'month-day-look-forward';
                  }
                  if (moment(date1, 'DD.MM.YYYY').isAfter(moment(date2, 'DD.MM.YYYY'))) {
                    return 'month-day-look-backwards';
                  }
                }
                if (date1 && date2 && moment(date2, 'DD.MM.YYYY').isSame(day)) {
                  if (moment(date1, 'DD.MM.YYYY').isBefore(moment(date2, 'DD.MM.YYYY'))) {
                    return 'month-day-look-backwards';
                  }
                  if (moment(date1, 'DD.MM.YYYY').isAfter(moment(date2, 'DD.MM.YYYY'))) {
                    return 'month-day-look-forward';
                  }
                }
                if (date1 && date2 && (
                  (
                    day.isBefore(moment(date1, 'DD.MM.YYYY')) && day.isAfter(moment(date2, 'DD.MM.YYYY'))
                  ) || (
                    day.isBefore(moment(date2, 'DD.MM.YYYY')) && day.isAfter(moment(date1, 'DD.MM.YYYY'))
                  )
                )) {
                  return 'month-day-is-between';
                }
                if (day.format('MMMM') !== currentMonthName) {
                  return 'month-day-not-current-month';
                }
                if (moment(day).isAfter(moment())) {
                  return 'month-day-is-future';
                }
                if (day.format('DD.MM.YYYY') === moment().format('DD.MM.YYYY')) {
                  return 'month-day-is-today';
                }
              }
            )()}`}
            key={i}
            onClick={() => {
              if (day.isBefore(moment()) && !day.isSame(moment(), 'day')) changeHandler(day.format('DD.MM.YYYY'));
            }}
          >
            <div className='month-day-inner'>{day.format('D')}</div>
            <div className='month-day-bg-lighter'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;