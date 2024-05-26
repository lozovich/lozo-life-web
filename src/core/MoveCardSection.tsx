import { handleDragEvent } from 'lib/drag.lib';
import { useCallback, useMemo } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from 'store';
import { ColumnElementType } from 'store/reducers/column.reducer';
import { TaskConstant } from 'store/reducers/task.reducer';
import DropDown from './DropDown';

type Props = {
  task: TaskConstant;
};

const MoveCardSection = ({ task }: Props) => {
  const dispatch = useDispatch();

  const { list } = useSelector((store: StoreType) => store.HomeReducer);
  const { data } = useSelector((store: StoreType) => store.BoardReducer);
  const { columns, columnOrder } = useSelector(
    (store: StoreType) => store.ColumReducer
  );

  const workspace = useMemo(
    () =>
      list.find(
        (workspaceData) => workspaceData._id.toString() === data?.workspace
      ),
    [data?.workspace, list]
  );
  const selectedColumn = useMemo(
    // eslint-disable-next-line no-nested-ternary
    () => (task?.listId ? (columns ? columns[task?.listId] : null) : null),
    [columns, task?.listId]
  );
  const generatePayload = useCallback(
    (destination: any): DropResult => ({
      source: {
        droppableId: selectedColumn?.listId ?? '',
        index: task?.order ?? 0
      },
      destination: {
        droppableId: destination.droppableId,
        index: destination.index
      },
      draggableId: task.taskId,
      reason: 'DROP',
      type: 'task',
      mode: 'FLUID'
    }),
    [selectedColumn?.listId, task?.order, task?.taskId]
  );

  const handleBoardClick = useCallback(
    (columnData: ColumnElementType, hide) => {
      const taskIndex = 1;

      const payload = generatePayload({
        droppableId: columnData.listId,
        index: taskIndex - 1
      });

      handleDragEvent({
        payload,
        dispatch,
        boardId: columnData?.boardId ?? '',
        columnOrder,
        columns,
        avoidApiCall: false
      });

      hide();
    },
    [columnOrder, columns, dispatch, generatePayload]
  );

  const handleIndexClick = useCallback(
    (index: number, hide) => {
      const payload = generatePayload({
        droppableId: selectedColumn?.listId ?? '',
        index: index - 1
      });

      handleDragEvent({
        payload,
        dispatch,
        boardId: task?.boardId ?? '',
        columnOrder,
        columns,
        avoidApiCall: false
      });

      hide();
    },
    [
      columnOrder,
      columns,
      dispatch,
      generatePayload,
      selectedColumn?.listId,
      task?.boardId
    ]
  );

  return (
    <div className='moveCardSection my-3'>
      <p className='moveCardSection__title'>Select Destination</p>

      <DropDown
        title='Select Destination'
        buttonId='select-destination-button'
        buttonClass='moveCardSection__select'
        className='moveCardSection__select'
        hideTitle
        buttonText={
          <div className='moveCardSectionSelect__title'>
            <p className='title'>Title</p>
            <p className='listName'>{workspace?.name} Workspace</p>
          </div>
        }
      >
        <div className='moveCardSectionSelect__body'>
          <p className='title'>{workspace?.name} Workspace</p>
          <div className='moveCardSectionSelect__list'>
            <p className='list__item active'>{data?.name}</p>
          </div>
        </div>
      </DropDown>

      <div className='d-flex align-items-center w-100'>
        <DropDown
          title='Select List'
          buttonId='select-destination-button'
          buttonClass='moveCardSection__select'
          className='moveCardSection__select'
          hideTitle
          style={{ flex: 1, marginRight: '10px' }}
          buttonText={
            <div className='moveCardSectionSelect__title'>
              <p className='title'>List</p>
              <p className='listName'>{selectedColumn?.title}</p>
            </div>
          }
          render={(onClose) => (
            <div className='moveCardSectionSelect__body'>
              {columns &&
                Object.values(columns).map((column) => (
                  <div
                    key={column?.listId}
                    className='moveCardSectionSelect__list'
                    onClick={() => handleBoardClick(column, onClose)}
                  >
                    <p className='list__item'>{column.title}</p>
                  </div>
                ))}
            </div>
          )}
        />

        <DropDown
          title='Select Position'
          buttonId='select-destination-button'
          buttonClass='moveCardSection__select'
          className='moveCardSection__select'
          hideTitle
          style={{ minWidth: '80px' }}
          buttonText={
            <div className='moveCardSectionSelect__title'>
              <p className='title'>Position</p>
              <p className='listName'>{task?.order ? task.order + 1 : 1}</p>
            </div>
          }
          render={(onClose) => (
            <div className='moveCardSectionSelect__body'>
              {selectedColumn &&
                selectedColumn?.taskIds &&
                selectedColumn?.taskIds.map((id, i) => (
                  <div
                    key={id}
                    className='moveCardSectionSelect__list'
                    onClick={() => handleIndexClick(i + 1, onClose)}
                  >
                    <p className='list__item'>
                      {i + 1}{' '}
                      {task?.order === i && id === task?.taskId
                        ? '(Current)'
                        : ''}
                    </p>
                  </div>
                ))}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default MoveCardSection;
