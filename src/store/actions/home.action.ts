import { createAction } from '@reduxjs/toolkit';
import { BoardDataType, HomeDataType } from 'store/reducers/home.reducer';

export const homeLoad = createAction('HOME_LOAD');
export const homeLoadSuccess = createAction('HOME_LOAD_SUCCESS');
export const homeLoadFailure = createAction('HOME_LOAD_FAILURE');

export const addWorkspaceToHome = createAction<HomeDataType>('ADD_WORKSPACE');

export const addBoardToWorkSpace = createAction<BoardDataType>('ADD_BOARD');
