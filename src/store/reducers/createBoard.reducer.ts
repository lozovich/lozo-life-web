/* eslint-disable prettier/prettier */
import { createReducer } from '@reduxjs/toolkit';
import {
  createBoard, createBoardFailure, createBoardSuccess, resetState
} from 'store/actions';



const initialState = {
  loading: false,
  error: '',
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createBoard, (state) => ({
      ...state,
      loading: true,
      error: '',
      data: []
    }))
    .addCase(createBoardSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: ''
    }))
    .addCase(createBoardFailure, (state, action) => ({
      ...state,
      error: action.payload ?? '',
      loading: false
    }))
    .addCase(resetState, (state) => initialState);
});
