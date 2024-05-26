import { Dispatch } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import {
  updateColumnsData,
  updateTaskAndColumnPosition,
  updateTaskInfo
} from 'store/actions';
import { ColumnDataType } from 'store/reducers/column.reducer';

type HandleDragEvent = {
  dispatch: Dispatch<any>;
  payload: DropResult;
  columns: ColumnDataType | null;
  columnOrder: string[];
  boardId: string;
  avoidApiCall: boolean;
};

export const handleDragEvent = ({
  dispatch,
  payload,
  columns,
  columnOrder,
  boardId,
  avoidApiCall = false
}: HandleDragEvent) => {
  const { destination, source, draggableId, type } = payload;

  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (!columns) return;

  const start = columns[source?.droppableId];
  const end = columns[destination?.droppableId];

  if (type === 'column') {
    const newOrder = Array.from(columnOrder);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);

    dispatch(
      updateTaskAndColumnPosition({
        listId: draggableId,
        order: destination.index,
        type,
        boardId,
        source,
        destination,
        draggableId,
        avoidApiCall
      })
    );

    return dispatch(
      updateColumnsData({
        columnOrder: newOrder
      })
    );
  }

  if (start === end) {
    const column = columns[source?.droppableId];
    const taskIds = [...column.taskIds];
    taskIds.splice(source.index, 1);
    taskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds
    };

    if (type === 'task') {
      dispatch(
        updateTaskInfo({
          taskId: draggableId,
          data: {
            listId: destination.droppableId,
            order: destination.index
          }
        })
      );
      dispatch(
        updateTaskAndColumnPosition({
          taskId: draggableId,
          listId: destination.droppableId,
          order: destination.index,
          type,
          boardId,
          source,
          destination,
          draggableId,
          avoidApiCall
        })
      );
    }

    return dispatch(
      updateColumnsData({
        columns: {
          ...columns,
          [column.listId]: newColumn
        }
      })
    );
  }

  const startTaskIds = start.taskIds ? [...start.taskIds] : [];
  const endTaskIds = end.taskIds ? [...end.taskIds] : [];

  startTaskIds.splice(source.index, 1);
  endTaskIds.splice(destination.index, 0, draggableId);

  const newStartColumn = {
    ...start,
    taskIds: startTaskIds
  };
  const endTaskColumn = {
    ...end,
    taskIds: endTaskIds
  };

  if (type === 'task') {
    dispatch(
      updateTaskInfo({
        taskId: draggableId,
        data: {
          listId: destination.droppableId,
          order: destination.index
        }
      })
    );

    dispatch(
      updateTaskAndColumnPosition({
        taskId: draggableId,
        listId: destination.droppableId,
        order: destination.index,
        type,
        boardId,
        source,
        destination,
        draggableId,
        avoidApiCall
      })
    );
  }

  return dispatch(
    updateColumnsData({
      columns: {
        ...columns,
        [start.listId]: newStartColumn,
        [end.listId]: endTaskColumn
      }
    })
  );
};
