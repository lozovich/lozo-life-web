import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCheckListGroupAction } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';
import { v4 } from 'uuid';

type Props = {
  hide: () => void;
  task: TaskConstant;
};

const CheckListSection = ({ hide, task }: Props) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAdd = useCallback(async () => {
    if (hide) hide();
    await addCheckListGroupAction({
      dispatch,
      data: {
        name: title,
        checkListGroupId: v4(),
        taskId: task.taskId,
        boardId: task?.boardId ?? ''
      }
    });
    setTitle('');
  }, [dispatch, hide, task?.boardId, task?.taskId, title]);

  return (
    <div className='checklistSection my-3'>
      <p className='checklistSection__title'>Title</p>
      <input
        type='text'
        placeholder='Checklist'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='d-flex align-items-center mt-3'>
        <button
          type='button'
          className='bg__primary text-white'
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CheckListSection;
