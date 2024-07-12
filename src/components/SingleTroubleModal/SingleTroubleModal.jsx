import React, { useEffect } from 'react';
import './singleTroubleModal.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditableParagraph from "../EditableParagraph/EditableParagraph";
import {
  editCause,
  editSideAccident,
  editSolution,
  editWorkStatus,
  getCauses,
  getSideAccidentStatuses,
  getTrouble,
  getWorkStatuses
} from "../../features/dataThunk";
import EditableSelect from "../EditableSelect/EditableSelect";

const SingleTroubleModal = ({ open, toggleModal, troubleId }) => {
  const dispatch = useAppDispatch();
  const {
    trouble,
    troubleLoading,
    sideAccidentStatuses,
    getSideAccidentStatusesLoading,
    workStatuses,
    getWorkStatusesLoading,
    getCausesLoading,
    causes,
  } = useAppSelector(state => state.dataState);
  
  useEffect(() => {
    if (troubleId && open) {
      dispatch(getTrouble(troubleId));
      dispatch(getSideAccidentStatuses());
      dispatch(getWorkStatuses());
      dispatch(getCauses());
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
  
  const onWorkStatusEdit = async (e, value) => {
    e?.preventDefault();
    await dispatch(editWorkStatus({
      status: value || '', id: trouble?.id,
    }))
    toggleModal();
  };
  
  const onCauseEdit = async (e, value) => {
    e?.preventDefault();
    await dispatch(editCause({
      cause: value || '', id: trouble?.id,
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
        {!troubleLoading && !getSideAccidentStatusesLoading && !getWorkStatusesLoading && !getCausesLoading ? <>
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
                <EditableSelect label='Сторона аварии'
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
            <tr>
              <td>Статус</td>
              <td>
                <EditableSelect label='Статус'
                  name='status'
                  value={trouble?.work_status}
                  onSubmit={onWorkStatusEdit}
                  open={open}
                  required
                  isNotTypable
                >
                  {workStatuses.map((status) => (
                    <div className='select-option'
                      value={status?.value}>{status?.key}</div>
                  ))}
                </EditableSelect>
              </td>
            </tr>
            <tr>
              <td>Статус</td>
              <td>
                <EditableSelect label='Причина'
                  name='cause'
                  value={trouble?.cause}
                  onSubmit={onCauseEdit}
                  open={open}
                  required
                  isNotTypable
                >
                  {causes.map((status) => (
                    <div className='select-option'
                      value={status?.value}>{status?.value}</div>
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