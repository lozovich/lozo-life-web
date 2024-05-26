import isInViewport from 'hooks/isInViewport';
import { useCallback, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TaskConstant } from 'store/reducers/task.reducer';
import TaskLabelChips from './Chips';
import TaskFooter from './TaskFooter';

type TaskBodyType = {
  task: TaskConstant;
  isDragging: boolean;
  toggleBackdrop: () => void;
  show: boolean;
  setReactPosition: (arg: DOMRect) => void;
};

const TaskBody = ({
  isDragging,
  task,
  toggleBackdrop,
  show,
  setReactPosition
}: TaskBodyType) => {
  const history = useHistory();
  const location = useLocation();
  const ref = useRef(null);

  const handleClick = useCallback(() => {
    if (!task?.taskId) return;

    history.push({
      pathname: `/task/${task?.taskId}`,
      state: { background: location }
    });
  }, [history, location, task?.taskId]);

  const handleEdit = useCallback(
    (e) => {
      e.stopPropagation();
      toggleBackdrop();
      if (!ref.current) return;

      const { rect } = isInViewport({ element: ref.current });
      setReactPosition(rect);
    },
    [setReactPosition, toggleBackdrop]
  );

  return (
    <div
      ref={ref}
      className={isDragging ? 'taskList grab__task' : 'taskList'}
      onClick={handleClick}
      style={show ? { zIndex: 2 } : {}}
    >
      {task?.labels && task.labels.length > 0 && <TaskLabelChips task={task} />}
      <p>{task?.content}</p>
      <div className='editIcon' onClick={handleEdit}>
        <i className='bi bi-pen-fill' />
      </div>
      <TaskFooter task={task} />
    </div>
  );
};

export default TaskBody;
