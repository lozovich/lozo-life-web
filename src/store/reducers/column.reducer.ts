/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  addBulkColumnData,
  addTaskToColumn,
  clearCard,
  createList,
  deleteColumn,
  deleteTask,
  resetState,
  updateColumnsData
} from 'store/actions';

export type ColumnElementType = {
  _id?: string;
  title: string;
  taskIds: string[];
  listId: string;
  createdBy?: string;
  boardId?: string;
  createdAt?: string;
};

export type ColumnDataType = {
  [k: string]: ColumnElementType;
};

export type ColumStateType = {
  columns: ColumnDataType | null;
  columnOrder: string[];
};

const initialState: ColumStateType = {
  columns: null,
  columnOrder: []
};

export type ColumnReducerType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createList, (state, action) => {
      const co = state?.columnOrder ?? [];

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.listId]: {
            taskIds: [],
            ...action.payload
          }
        },
        columnOrder: [...co, action.payload.listId]
      };
    })
    .addCase(updateColumnsData, (state, action) => ({
      ...state,
      ...action.payload
    }))
    .addCase(addTaskToColumn, (state, action) => {
      if (!state.columns) return state;
      if (!state.columns[action.payload.column].taskIds) {
        state.columns[action.payload.column].taskIds = [action.payload.taskId];
        return state;
      }
      state.columns[action.payload.column].taskIds.push(action.payload.taskId);
    })
    .addCase(addBulkColumnData, (state, action) => action.payload)
    .addCase(clearCard, () => initialState)
    .addCase(deleteTask, (state, action) => {
      const columData = state.columns
        ? state.columns[action.payload.columnId]
        : null;

      if (!columData) return state;
      if (!columData.taskIds) return state;

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.columnId]: {
            ...columData,
            taskIds: columData.taskIds.filter(
              (taskId) => taskId !== action.payload.taskID
            )
          }
        }
      };
    })
    .addCase(deleteColumn, (state, action) => {
      const newState: ColumStateType = { ...state };
      const cols = newState?.columns ? { ...newState?.columns } : {};

      delete cols[action.payload.listId];


      return {
        columns: cols,
        columnOrder: [
          ...state.columnOrder.filter((id) => id !== action.payload.listId)
        ]
      };
    })
    .addCase(resetState, (state) => initialState);
});
