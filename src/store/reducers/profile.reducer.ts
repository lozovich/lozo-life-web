/* eslint-disable prettier/prettier */
import { createReducer } from '@reduxjs/toolkit';
import { resetState } from 'store/actions';
import {
  profileLoad,
  profileLoadFailure,
  profileLoadSuccess,
  updateProfile
} from 'store/actions/user.action';

const initialState = {
  loading: false,
  error: '',
  firstName: '',
  lastName: '',
  email: '',
  loginType: '',
  profileImage: '',
  isRegistered: false,
  createdAt: '',
  updatedAt: '',
  _id: ''
};

export type ProfileType = typeof initialState;

const profileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(profileLoad, (state) => ({
      ...state,
      loading: true,
      error: ''
    }))
    .addCase(profileLoadSuccess, (state, action) => {
      const {
        firstName = '',
        lastName = '',
        email = '',
        loginType = '',
        profileImage = '',
        isRegistered = false,
        createdAt = '',
        updatedAt = '',
        _id = ''
      }: any = action.payload;
      return {
        ...state,
        loading: false,
        error: '',
        firstName,
        lastName,
        email,
        loginType,
        profileImage,
        isRegistered,
        createdAt,
        updatedAt,
        _id
      };
    })
    .addCase(profileLoadFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload ?? ''
    }))
    .addCase(updateProfile, (state, action) => {
      const { firstName, lastName, email, profileImage } = action.payload;

      return {
        ...state,
        firstName, lastName, email, profileImage
      };
    })
    .addCase(resetState, (state) => initialState);
});

export default profileReducer;
