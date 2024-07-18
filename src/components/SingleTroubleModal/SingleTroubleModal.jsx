import React, { useEffect, useState } from 'react';
import './singleTroubleModal.css';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { formatDate, formatDuration } from "../../constants";
import Select from "../Select/Select";

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
    editSolutionLoading,
    editCommentLoading,
  } = useAppSelector(state => state.dataState);
  const [state, setState] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [solution, setSolution] = useState('');
  
  useEffect(() => {
    setState((
      {
        work_status: trouble?.work_status,
        side_accident: trouble?.side_accident,
        cause: trouble?.cause,
      }
    ));
  }, [trouble?.cause, trouble?.side_accident, trouble?.work_status]);
  
  useEffect(() => {
    if (troubleId && open) {
      setSolution('');
      dispatch(getTrouble(troubleId));
      dispatch(getSideAccidentStatuses());
      dispatch(getWorkStatuses());
      dispatch(getCauses());
    }
  }, [dispatch, open, troubleId]);
  
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => (
      {
        ...prevState, [name]: value,
      }
    ))
  };
  
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
      side_accident: value ? value : state?.side_accident || '',
      id: trouble?.id,
    }));
    toggleModal();
  };
  
  const onWorkStatusEdit = async (e, value) => {
    e?.preventDefault();
    await dispatch(editWorkStatus({
      status: value ? value : state?.work_status || '', id: trouble?.id,
    }))
    toggleModal();
  };
  
  const onCauseEdit = async (e, value) => {
    e?.preventDefault();
    await dispatch(editCause({
      cause: value ? value : state?.cause || '', id: trouble?.id,
    }))
    toggleModal();
  };
  
  const onCommentEdit = async (e) => {
    e?.preventDefault();
    await dispatch(editComment({
      comment_text: commentText || '',
      post_id: trouble?.bitrix_post_id,
      user_id: trouble?.responsible,
      responsible: trouble?.responsible,
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
              <td>Номер</td>
              <td className='trouble-value-outlined'>
                <span>
                {trouble?.id}
                </span>
              </td>
            </tr>
            <tr>
              <td>Время падения</td>
              <td className='trouble-value-outlined'>
                <span>
                {trouble?.reported_at ? formatDate(trouble?.reported_at) : '-'}
                </span>
              </td>
            </tr>
            <tr>
              <td>Время восстановления</td>
              <td className='trouble-value-outlined'>
                <span>
                {trouble?.restore_time ? formatDate(trouble?.restore_time) : '-'}
                </span>
              </td>
            </tr>
            <tr>
              <td>Вр. отсутств. сервиса</td>
              <td className='trouble-value-outlined'>
                <span>
                {trouble?.duration ? formatDuration(trouble?.duration) : '-'}
                </span>
              </td>
            </tr>
            <tr>
              <td>Кол-во абонентов</td>
              <td className='trouble-value-outlined'>
                <span>
                {trouble?.subscriber_count}
                </span>
              </td>
            </tr>
            <tr>
              <td>Локация</td>
              <td className='trouble-value-outlined'>
                <span>
                {trouble?.location}
                </span>
              </td>
            </tr>
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
                    loading={editSolutionLoading}
                    disabled={!solution}
                  >Сохранить</Button>
                </form>
              </td>
            </tr>
            <tr>
              <td>Сторона аварии</td>
              <td>
                <form onSubmit={onSideAccidentEdit}>
                  <Select
                    label='Сторона аварии'
                    name='side_accident'
                    value={state?.side_accident}
                    onChange={handleChange}
                    dontClearOnFocus={true}
                    manualEditable
                    required
                  >
                    {sideAccidentStatuses.map(side => side?.value).map((type) => (
                      <div value={type}
                        onClick={onSideAccidentEdit}>{type}</div>
                    ))}
                  </Select>
                </form>
              </td>
            </tr>
            <tr>
              <td>Статус</td>
              <td>
                <form onSubmit={onWorkStatusEdit}>
                  <Select
                    label='Статус'
                    name='work_status'
                    value={state?.work_status}
                    onChange={handleChange}
                    dontClearOnFocus={true}
                    required
                  >
                    {workStatuses.map((status) => (
                      <div value={status?.value} onClick={onWorkStatusEdit}>{status?.key}</div>
                    ))}
                  </Select>
                </form>
              </td>
            </tr>
            <tr>
              <td>Причина</td>
              <td>
                <form onSubmit={onCauseEdit}>
                  <Select
                    label='Причина'
                    name='cause'
                    value={state?.cause}
                    onChange={handleChange}
                    dontClearOnFocus={true}
                    required
                  >
                    {causes.map((status) => (
                      <div value={status?.key} onClick={onCauseEdit}>{status?.value}</div>
                    ))}
                  </Select>
                </form>
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
                    loading={editCommentLoading}
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