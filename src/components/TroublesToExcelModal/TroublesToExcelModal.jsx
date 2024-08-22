import React, { useState } from 'react';
import DatePicker from "../DatePicker/DatePicker";
import moment from "moment";
import * as XLSX from 'xlsx';
import './troublesToExcelModal.css';
import Button from "../Button/Button";
import axiosApi from "../../axiosApi";

const TroublesToExcelModal = ({
  open,
  toggleModal
}) => {
  const [state, setState] = useState({
    periodDate1: moment().subtract(7, 'days').format('DD.MM.YYYY'),
    periodDate2: moment().subtract(1, 'days').format('DD.MM.YYYY'),
  });
  const [troublesLoading, setTroublesLoading] = useState(false);
  
  const changeHandler = (value) => {
    if (!state.periodDate1) {
      setState(prevState => (
        {
          ...prevState,
          periodDate1: value,
          date2: '',
        }
      ));
    } else if (state.periodDate1 && !state.periodDate2) {
      if (moment(value, 'DD.MM.YYYY').isBefore(moment(state.periodDate1, 'DD.MM.YYYY'))) {
        setState(prevState => (
          {
            ...prevState,
            periodDate1: value,
            periodDate2: state.periodDate1,
          }
        ));
      } else {
        setState(prevState => (
          {
            ...prevState,
            periodDate2: value,
          }
        ));
      }
    } else if (state.periodDate1 && state.periodDate2) {
      setState(prevState => (
        {
          ...prevState,
          periodDate1: value,
          periodDate2: '',
        }
      ));
    }
  };
  
  const onSubmit = async () => {
    try {
      setTroublesLoading(true);
      const date1 = moment(state?.periodDate1, 'DD.MM.YYYY').format('YYYY-MM-DD');
      const date2 = moment(state?.periodDate2, 'DD.MM.YYYY').format('YYYY-MM-DD');
      
      const req = await axiosApi(`incident_list/?start_date=${date1}T00:00:00&end_date=${date2}T23:59:59`);
      const res = await req.data.results;
      setTroublesLoading(false);
      if (res.length) {
        const result = res?.map(trouble => {
          if (!trouble?.location_areas.includes('{')) return {
            ...trouble,
          };
          const parsed = JSON.parse(trouble?.location_areas?.replace(/'/g, '"'));
          const region = parsed?.region?.name;
          const city = parsed?.city?.name;
          const district = parsed?.district?.name;
          const streets = Array.isArray(parsed?.street) ? parsed?.street?.map(street => street.name)?.join(',  ') : parsed?.street?.name;
          const houses = Array.isArray(parsed?.houses) ? parsed?.houses?.map(house => house.name)?.join(',  ') : parsed?.houses?.name;
          return {
            ...trouble,
            location_areas: `${region}, ${city}, ${district}, ${streets}, ${houses}`,
          };
        })
        await handleExcelFileExport(result);
        toggleModal();
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const handleExcelFileExport = (data) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    const calculateColumnWidths = (data) => {
      const columnWidths = [];
      
      data.forEach(row => {
        Object.keys(row).forEach((key, colIndex) => {
          const value = row[key]?.toString() || '';
          columnWidths[colIndex] = Math.max(columnWidths[colIndex] || 10, value.length);
        });
      });
      
      return columnWidths.map(width => (
        { wch: width + 2 }
      ));
    };
    
    worksheet['!cols'] = calculateColumnWidths(data);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Аварии');
    XLSX.writeFile(workbook, `Аварии ${state?.periodDate1} - ${state?.periodDate2}.xlsx`);
  };
  
  
  return (
    <div
      className='single-trouble-modal-container'
      onClick={() => toggleModal()}
      open={open}
    >
      <div
        className='single-trouble-modal'
        onClick={e => e.stopPropagation()}
      >
        <h3>Выгрузить список аварий в Excel файл</h3>
        <DatePicker
          changeHandler={changeHandler}
          date1={state?.periodDate1}
          date2={state?.periodDate2}
        />
        <Button
          variant='success'
          style={{
            padding: '4px 8px',
            width: '100%'
          }}
          loading={troublesLoading}
          disabled={!state?.periodDate1 || !state?.periodDate2}
          onClick={onSubmit}
        >Выгрузить</Button>
      </div>
    </div>
  );
};

export default TroublesToExcelModal;