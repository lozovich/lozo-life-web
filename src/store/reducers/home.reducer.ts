import { createReducer } from '@reduxjs/toolkit';
import {
  addBoardToWorkSpace,
  addWorkspaceToHome,
  changeBackground,
  homeLoad,
  homeLoadFailure,
  homeLoadSuccess,
  resetState
} from 'store/actions';

export type BoardDataType = {
  name?: string;
  backgroundColor?: string;
  workspace?: string;
  createdBy?: string;
  _id?: string;
  [k: string]: any;
};

export type HomeDataType = {
  name: string;
  description: string;
  _id: string;
  createdBy?: string;
  boards: BoardDataType[];
  [key: string]: any;
};

const initialState = {
  loading: false,
  error: '',
  list: [] as HomeDataType[]
};

export type HomeReducerType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(homeLoad, (state) => ({
      ...state,
      loading: true,
      error: ''
    }))
    .addCase(homeLoadSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: '',
      list: action.payload ?? []
    }))
    .addCase(homeLoadFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload ?? ''
    }))
    .addCase(addWorkspaceToHome, (state, action) => ({
      ...state,
      list: [...state.list, action.payload]
    }))
    .addCase(addBoardToWorkSpace, (state, action) => {
      state.list.map((workspaceData) => {
        if (workspaceData._id === action.payload?.workspace) {
          const listBoard = workspaceData?.boards ?? [];
          listBoard.push(action.payload);

          // eslint-disable-next-line no-param-reassign
          workspaceData.boards = listBoard;

          return workspaceData;
        }

        return workspaceData;
      });
    })
    .addCase(changeBackground, (state, action) => {
      state.list.map((workspaceData) => {
        if (workspaceData._id === action.payload?.workspace) {
          const listBoard = workspaceData?.boards ?? [];
          listBoard.map((board) => {
            if (board.id === action.payload.boardId)
              return {
                ...board,
                backgroundColor: action.payload.backgroundColor
              };

            return board;
          });

          // eslint-disable-next-line no-param-reassign
          workspaceData.boards = listBoard;

          return workspaceData;
        }

        return workspaceData;
      });
    })
    .addCase(resetState, (state) => initialState);
});
