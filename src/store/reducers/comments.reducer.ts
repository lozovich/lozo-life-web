/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  loadComments,
  loadCommentsFailure,
  loadCommentsSuccess,
  resetState
} from 'store/actions';

const initialState = {
  loading: false,
  error: ''
};

export type CommentReducerType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(loadComments, (state, action) => ({
      ...state,
      loading: true,
      error: ''
    }))
    .addCase(loadCommentsSuccess, (state, action) => ({
      ...state,
      loading: false
    }))
    .addCase(loadCommentsFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload
    }))
    .addCase(resetState, (state) => initialState);
});
