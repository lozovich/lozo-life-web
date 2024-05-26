import socketEvents from 'hooks/socketEvents';
import { useCallback, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTaskAction } from 'store/actions';
import { TaskConstant } from 'store/reducers/task.reducer';
import TaskBody from './components/TaskBody';
import TaskOptions from './components/TaskOptions';
import './style.scss';

type TaskTypeWrap = {
  task: TaskConstant;
  index: number;
};

const TasksList = ({ task, index }: TaskTypeWrap) => {
  const { socket, userProfile } = socketEvents();
  const dispatch = useDispatch();
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [reactPosition, setReactPosition] = useState<DOMRect>({} as DOMRect);

  const toggleBackdrop = useCallback(() => {
    setShowTaskMenu((prevState) => !prevState);
  }, []);

  useEffect(() => {
    if (!socket.connected) return;

    socket.off('delete-task').on('delete-task', (_data: any) => {
      const { taskId, listId, userId, boardId } = _data;

      if (userProfile._id === userId) return;

      deleteTaskAction({
        dispatch,
        data: {
          taskID: taskId,
          columnId: listId,
          boardId,
          avoidApiCall: true
        }
      });
    });
  }, [dispatch, socket, userProfile._id]);

  return (
    <>
      <Draggable draggableId={task?.taskId} index={index}>
        {(provided, snapshot) => (
          <div
            id={task?.taskId}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <TaskBody
              isDragging={snapshot.isDragging}
              task={task}
              toggleBackdrop={toggleBackdrop}
              show={showTaskMenu}
              setReactPosition={setReactPosition}
            />
          </div>
        )}
      </Draggable>

      {showTaskMenu && (
        <div className='task__backdrop' onClick={toggleBackdrop} />
      )}

      {showTaskMenu && (
        <TaskOptions
          toggleBackdrop={toggleBackdrop}
          position={reactPosition}
          task={task}
        />
      )}
    </>
  );
};

export default TasksList;
