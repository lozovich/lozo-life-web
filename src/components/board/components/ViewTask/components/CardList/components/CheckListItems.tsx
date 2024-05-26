import classNames from 'classnames';
import DropDown from 'core/DropDown';
import TextAreaCombo from 'core/TextAreaCombo';
import IsVisibleLayout from 'hooks/isVisibleLayout';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCheckListAction, updateCheckListAction } from 'store/actions';
import { TaskCheckListType } from 'store/reducers/task.reducer';

type CheckListItemType = {
  data: TaskCheckListType;
  boardId: string;
};

const CheckListItems = ({ data, boardId }: CheckListItemType) => {
  const dispatch = useDispatch();
  const TextAreaComboIds = useMemo(
    () => ({
      textarea: `CheckListItems_text${data.checkListId}`,
      submitButton: `CheckListItems_submit${data.checkListId}`
    }),
    [data.checkListId]
  );

  const [showTextarea, handleShowTextarea, textareaRef] =
    IsVisibleLayout<HTMLTextAreaElement>(TextAreaComboIds);
  const [checkListName, setCheckListName] = useState(data?.title ?? '');

  const handelSave = useCallback(
    async (e: any) => {
      // textareaRef.current?.focus();
      e.preventDefault();
      e.stopPropagation();
      const payload = {
        checkListId: data?.checkListId ?? '',
        title: checkListName,
        isDone: data?.isDone ?? false,
        taskId: data?.taskId ?? '',
        checkListGroupId: data?.checkListGroupId ?? '',
        boardId
      };
      handleShowTextarea(false);
      await updateCheckListAction({
        dispatch,
        data: payload
      });
    },
    [
      boardId,
      checkListName,
      data?.checkListGroupId,
      data?.checkListId,
      data?.isDone,
      data?.taskId,
      dispatch,
      handleShowTextarea
    ]
  );

  const handleListClick = useCallback(() => {
    handleShowTextarea(true);
    setCheckListName(data?.title ?? '');
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }, 100);
  }, [data?.title, handleShowTextarea, textareaRef]);

  const handleTextAreaClick = useCallback(
    (e: React.MouseEvent<HTMLTextAreaElement>) => {
      e.stopPropagation();
      e.preventDefault();
    },
    []
  );

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      const payload = {
        checkListId: data?.checkListId ?? '',
        title: data?.title ?? '',
        isDone: e.target.checked ?? false,
        taskId: data?.taskId ?? '',
        checkListGroupId: data?.checkListGroupId ?? '',
        boardId
      };

      await updateCheckListAction({
        dispatch,
        data: payload
      });
    },
    [
      boardId,
      data?.checkListGroupId,
      data?.checkListId,
      data?.taskId,
      data?.title,
      dispatch
    ]
  );

  const handleDeleteCheckList = useCallback(() => {
    const { checkListId = '', checkListGroupId = '', taskId = '' } = data;

    deleteCheckListAction({
      dispatch,
      data: {
        checkListId,
        checkListGroupId,
        taskId,
        boardId
      }
    });
  }, [boardId, data, dispatch]);

  return (
    <div className='checkListItems row m-0' onClick={handleListClick}>
      <div className='col-1 p-0 d-flex'>
        <input
          type='checkbox'
          className='mt-1'
          onChange={handleChange}
          onClick={(e) => {
            e.stopPropagation();
          }}
          checked={data.isDone}
        />
      </div>

      <div className='col-11'>
        {showTextarea ? (
          <TextAreaCombo
            className='checkListItems__textarea'
            ref={textareaRef}
            buttonText='Save'
            value={checkListName}
            onSubmit={handelSave}
            onClick={handleTextAreaClick}
            textAreaId={TextAreaComboIds.textarea}
            submitButtonId={TextAreaComboIds.submitButton}
            onChange={(e) => setCheckListName(e.target.value)}
          />
        ) : (
          <div className='d-flex justify-content-between '>
            <div
              className={classNames('checkListItems__title', {
                cross: data.isDone
              })}
            >
              {data?.title}
            </div>
            <div className='checkListItems__options'>
              <DropDown
                title='Item Action'
                buttonId='Checklist-close-dropdown-button'
                buttonStyle={{ background: 'transparent', padding: 0 }}
                buttonText={<i className='bi bi-three-dots' />}
                stopPropagation
              >
                <div className='checklist__options'>
                  <span onClick={handleDeleteCheckList}>Delete</span>
                </div>
              </DropDown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckListItems;
