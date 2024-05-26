/* eslint-disable no-useless-return */
/* eslint-disable prettier/prettier */
import CardSkeletonLoader from 'components/Loader/CardSkeletonLoader';
import { join, leaveRoom } from 'config/app';
import socketEvents from 'hooks/socketEvents';
import { handleDragEvent } from 'lib/drag.lib';
import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreType } from 'store';
import { clearCard, getBoard } from 'store/actions';
import { ColumnElementType } from 'store/reducers/column.reducer';
import AddList from './components/AddList';
import BoardCards from './components/Cards';
import SubHeader from './components/subheader';
import './style.scss';

const BoardIndex = () => {
  const { socket, userProfile } = socketEvents();
  const [showAddCard, setShowAddCard] = useState<ColumnElementType | null>();
  const { columns, columnOrder } = useSelector(
    (store: StoreType) => store.ColumReducer
  );
  const { data, loading } = useSelector((store: StoreType) => store.BoardReducer);
  const taskList = useSelector((store: StoreType) => store.TaskReducer);
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    if (id.includes(':id')) return;
    dispatch(getBoard({ boardId: id }));

    return () => {
      dispatch(clearCard());
    };
  }, [dispatch, id]);

  useEffect(() => {
    // SOCKET JOIN and LEAVE ROOM
    if (!id) return;

    join(id);

    return () => {
      leaveRoom(id);
    };
  }, [id]);

  useEffect(() => {

    if (!socket.connected) return;

    socket.off('update-card-position').on('update-card-position', (_data: any) => {

      const { type, source, destination, draggableId, boardId, listId, userId } = _data;

      if (userProfile._id === userId) return;

      const _payload: any = {
        destination,
        source,
        draggableId,
        type
      };

      handleDragEvent({
        payload: _payload,
        dispatch,
        boardId: boardId.toString(),
        columnOrder,
        columns,
        avoidApiCall: true
      });
    });

  }, [columnOrder, columns, dispatch, socket, userProfile._id]);

  const onDragStart = useCallback(() => {

    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  }, []);

  const onDragEnd = useCallback(
    (payload: DropResult) => {
      handleDragEvent({
        payload,
        dispatch,
        boardId: id ?? '',
        columnOrder,
        columns,
        avoidApiCall: false
      });
    },
    [columnOrder, columns, dispatch, id]
  );

  return (
    <>
      <div
        className='board'
        style={{ backgroundColor: `${data?.backgroundColor}` }}
      >
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable
            droppableId='all-column'
            type='column'
            direction='horizontal'
          >
            {(provided) => (
              <>
                <SubHeader />
                <div
                  className=' d-flex justify-content-start board__body'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {loading ? <>
                    <CardSkeletonLoader taskCount={6} />
                    <CardSkeletonLoader taskCount={3} />
                    <CardSkeletonLoader taskCount={5} />
                    <CardSkeletonLoader taskCount={1} />
                  </>
                    : <>
                      {columnOrder &&
                        columnOrder.map((columnId, index) => {
                          const column = columns ? columns[columnId] : null;
                          const tasks: any = column?.taskIds
                            ? column?.taskIds.map(
                              (taskId: string) => taskList[taskId]
                            )
                            : [];

                          return (
                            column?.listId && (
                              <BoardCards
                                index={index}
                                key={column?.listId}
                                column={column}
                                tasks={tasks}
                                setShowAddCard={setShowAddCard}
                                showAddCard={showAddCard?.listId === column?.listId}
                                boardId={id}
                              />
                            )
                          );
                        })}
                    </>
                  }
                  {provided.placeholder}
                  {!loading && <AddList boardId={id} />}
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default BoardIndex;
