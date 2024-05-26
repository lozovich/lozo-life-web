import { createReducer } from '@reduxjs/toolkit';
import { userLoggedIn } from 'config/app';
import {
  addAuthData,
  authLoad,
  authLoadFailure,
  authLoadSuccess,
  resetState,
  signOutAction
} from 'store/actions';

const initialState = {
  loading: false,
  error: '',
  auth: false,
  accessToken: '',
  refreshToken: ''
};

// eslint-disable-next-line import/prefer-default-export
export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authLoad, (state) => ({
      ...state,
      loading: true,
      error: ''
    }))
    .addCase(authLoadSuccess, (state, action) => {
      const payload: any = action.payload ?? {};

      return {
        ...state,
        loading: false,
        error: '',
        auth: true,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken
      };
    })
    .addCase(authLoadFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload ?? ''
    }))
    .addCase(addAuthData, (state, action) => {
      const payload: any = action.payload ?? {};

      return {
        ...state,
        loading: false,
        error: '',
        auth: true,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken
      };
    })
    .addCase(signOutAction, (state) => {
      userLoggedIn(false);
      return {
        ...state,
        loading: false,
        error: '',
        auth: false,
        accessToken: '',
        refreshToken: ''
      };
    })
    .addCase(resetState, (state) => initialState);
});
