import React, { useEffect, useState } from 'react';
import './singleTroubleModal.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditableParagraph from "../EditableParagraph/EditableParagraph";
import {
  editCause,
  editComment,
  editSideAccident,
  editSolution,
  editWorkStatus,
  getCauses,
  getSideAccidentStatuses,
  getTrouble,
  getWorkStatuses
} from "../../features/dataThunk";
import EditableSelect from "../EditableSelect/EditableSelect";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";

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
  const [commentText, setCommentText] = useState('');
  const [solution, setSolution] = useState('');
  
  useEffect(() => {
    if (troubleId && open) {
      setSolution('');
      dispatch(getTrouble(troubleId));
      dispatch(getSideAccidentStatuses());
      dispatch(getWorkStatuses());
      dispatch(getCauses());
    }
  }, [dispatch, open, troubleId]);
  
  const onSolutionEdit = async (e) => {
    e?.preventDefault();
    await dispatch(editSolution({
      solution: solution || '', id: trouble?.id,
    }))
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
  
  const onCommentEdit = async (e) => {
    e?.preventDefault();
    await dispatch(editComment({
      comment_text: solution || '', post_id: trouble?.bitrix_post_id,
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
                <form onSubmit={onSolutionEdit}>
                  <TextArea label='Введите решение...'
                    value={solution}
                    onChange={e => setSolution(e.target.value)}
                    required
                  />
                  <Button variant='success'
                    type='submit'
                    style={{
                      padding: '4px 8px', width: '100%'
                    }}
                    disabled={!solution}
                  >Сохранить</Button>
                </form>
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
              <td>Причина</td>
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
            <tr>
              <td>Комментарий</td>
              <td>
                <form onSubmit={onCommentEdit}>
                  <TextArea label='Введите комментарий...'
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    required
                  />
                  <Button variant='success'
                    type='submit'
                    style={{
                      padding: '4px 8px', width: '100%'
                    }}
                    disabled={!commentText}
                  >Сохранить</Button>
                </form>
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