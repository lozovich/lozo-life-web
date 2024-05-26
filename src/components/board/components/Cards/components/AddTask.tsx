/* eslint-disable react/button-has-type */
import { getId } from 'config/app';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, addTaskToColumn } from 'store/actions';
import '../style.scss';

type AddTaskType = {
  setShowAddCard: (args: any) => void;
  columnId: string | undefined;
  boardId: string | undefined;
};

const AddTask = ({ setShowAddCard, columnId, boardId }: AddTaskType) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const hide = useCallback(() => {
    setShowAddCard({});
  }, [setShowAddCard]);

  const handleClick = useCallback(() => {
    if (!textAreaRef.current?.value || !columnId || !boardId) return;

    const taskId = getId();
    dispatch(
      addTask({
        taskId,
        content: textAreaRef.current?.value,
        boardId,
        listId: columnId
      })
    );

    dispatch(
      addTaskToColumn({
        taskId,
        column: columnId
      })
    );

    hide();
  }, [boardId, columnId, dispatch, hide]);

  return (
    <div className='addTask__body'>
      <textarea ref={textAreaRef} />
      <div className='d-flex align-items-center'>
        <button onClick={handleClick}>Add Card</button>
        <i onClick={hide} className='bi bi-x-lg' />
      </div>
    </div>
  );
};

export default AddTask;
