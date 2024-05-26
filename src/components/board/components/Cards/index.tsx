/* eslint-disable jsx-a11y/no-static-element-interactions */

import DropDown from 'core/DropDown';
import isMobileView from 'hooks/isMobileView';
import socketEvents from 'hooks/socketEvents';
import { BoardCardType } from 'interfaces/board.interface';
import { useCallback, useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { addTask, addTaskToColumn, deleteColumnAction } from 'store/actions';
import TasksList from '../Tasks';
import AddTask from './components/AddTask';
import AddTaskButton from './components/AddTaskButton';
import './style.scss';

const BoardCards = ({
  index,
  column,
  tasks,
  showAddCard,
  setShowAddCard,
  boardId
}: BoardCardType) => {
  const { socket, userProfile } = socketEvents();
  const dispatch = useDispatch();
  const width = isMobileView();

  const handleDelete = useCallback(() => {
    if (!column) return;

    deleteColumnAction({
      dispatch,
      data: {
        listId: column?.listId,
        boardId: column?.boardId ?? ''
      }
    });
  }, [column, dispatch]);

  useEffect(() => {
    if (!socket.connected) return;

    socket.off('add-task').on('add-task', (_data: any) => {
      const { taskData, userId } = _data;
      const { taskId, content, listId } = taskData;

      if (userProfile._id === userId) return;
      dispatch(
        addTask({
          taskId,
          content,
          boardId: taskData.boardId,
          listId,
          avoidApiCall: true
        })
      );

      dispatch(
        addTaskToColumn({
          taskId,
          column: listId
        })
      );
    });

    socket.off('delete-list').on('delete-list', (_data: any) => {
      const { listId, userId } = _data;

      if (userProfile._id === userId) return;
      deleteColumnAction({
        dispatch,
        data: {
          listId,
          boardId: _data.boardId,
          avoidApiCall: true
        }
      });
    });
  }, [dispatch, socket, userProfile?._id]);

  return (
    <Draggable draggableId={column?.listId ?? ''} index={index}>
      {(provided) => (
        <>
          <section
            className='boardCards'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{ maxHeight: '100%', ...provided.draggableProps.style }}
          >
            <div className='d-flex justify-content-between title'>
              <h5>{column?.title}</h5>
              <DropDown
                title='List Actions'
                buttonId='List-action-dropdown-button'
                buttonText={<i className='bi bi-three-dots' />}
                pos={width ? 0 : -100}
                render={() => (
                  <span
                    className='py-1 d-flex'
                    style={{ cursor: 'pointer' }}
                    onClick={handleDelete}
                  >
                    Delete
                  </span>
                )}
              />
            </div>
            <Droppable droppableId={column?.listId ?? ''} type='task'>
              {(_provided) => (
                <div
                  className='boardCards__body'
                  ref={_provided.innerRef}
                  {..._provided.droppableProps}
                >
                  <div>
                    {tasks &&
                      tasks.length > 0 &&
                      tasks.map((task, _index) => (
                        <TasksList
                          key={task?.taskId}
                          task={task}
                          index={_index}
                        />
                      ))}

                    {_provided.placeholder}

                    {showAddCard ? (
                      <AddTask
                        setShowAddCard={setShowAddCard}
                        columnId={column?.listId}
                        boardId={boardId}
                      />
                    ) : (
                      <AddTaskButton
                        setShowAddCard={setShowAddCard}
                        column={column}
                      />
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          </section>
        </>
      )}
    </Draggable>
  );
};

export default BoardCards;
