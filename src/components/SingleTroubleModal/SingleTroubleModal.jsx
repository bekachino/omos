import React, { useEffect } from 'react';
import './singleTroubleModal.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditableParagraph from "../EditableParagraph/EditableParagraph";
import {
  editSideAccident,
  editSolution, getSideAccidentStatuses,
  getTrouble
} from "../../features/dataThunk";
import EditableSelect from "../EditableSelect/EditableSelect";

const SingleTroubleModal = ({ open, toggleModal, troubleId }) => {
  const dispatch = useAppDispatch();
  const {
    trouble,
    troubleLoading,
    sideAccidentStatuses,
    getSideAccidentStatusesLoading,
  } = useAppSelector(state => state.dataState);
  
  useEffect(() => {
    if (troubleId) {
      dispatch(getTrouble(troubleId));
      dispatch(getSideAccidentStatuses());
    }
  }, [dispatch, open, troubleId]);
  
  const onSolutionEdit = async (e, value) => {
    e.preventDefault();
    await dispatch(editSolution({ solution: value || '', id: trouble?.id, }))
    toggleModal();
  };
  
  const onSideAccidentEdit = async (e, value) => {
    e?.preventDefault();
    await dispatch(editSideAccident({
      side_accident: value || '', id: trouble?.id,
    }))
    toggleModal();
  };
  
  return (
    <div
      className='single-trouble-modal-container'
      onClick={() => toggleModal()}
      open={open}
    >
      <div className='single-trouble-modal'
        onClick={e => e.stopPropagation()}
      >
        {!troubleLoading || !getSideAccidentStatusesLoading ? <>
          <h3>Детальный просмотр</h3>
          <table>
            <tbody>
            <tr>
              <td>Решение</td>
              <td>
                <EditableParagraph
                  value={trouble?.solution}
                  onSubmit={onSolutionEdit}
                  open={open}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Сторона аварии</td>
              <td>
                <EditableSelect label='Причина'
                  name='incident_type'
                  value={trouble?.side_accident}
                  onSubmit={onSideAccidentEdit}
                  open={open}
                  required
                >
                  {sideAccidentStatuses.map(side => side?.value).map((type) => (
                    <div className='select-option'
                      value={type}>{type}</div>
                  ))}
                </EditableSelect>
              </td>
            </tr>
            </tbody>
          </table>
        </> : <div className='trouble-modal-loading'/>}
      </div>
    </div>
  );
};

export default SingleTroubleModal;