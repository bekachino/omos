import React from 'react';
import './singleTroubleModal.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const SingleTroubleModal = ({ open, toggleModal }) => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.dataState);
  
  return (
    <div className='single-trouble-modal-container'
      onClick={toggleModal}
      open={open}
    >
      <div className='single-trouble-modal'
        onClick={e => e.stopPropagation()}
      >
        <h3>Детальный просмотр</h3>
      </div>
    </div>
  );
};

export default SingleTroubleModal;