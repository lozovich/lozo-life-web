import { createAction } from '@reduxjs/toolkit';

export type AuthPayloadType = {
  auth: boolean;
  accessToken: string;
  refreshToken: string;
};

export const authLoad =
  createAction<{ history?: any; path?: string }>('AUTH_LOAD');
export const authLoadSuccess = createAction('AUTH_LOAD_SUCCESS');
export const authLoadFailure = createAction('AUTH_LOAD_FAILURE');

export const addAuthData = createAction<AuthPayloadType>('ADD_AUTH_DATA');
export const signOutAction = createAction('SIGN_OUT');
