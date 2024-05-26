/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { addBulkMembers, resetState, updateProfile } from 'store/actions';

export type UserType = {
  _id?: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  [k: string]: any;
};

export type MemberDataType = {
  _id?: string;
  boardId: string;
  role: string;
  user: UserType;
  [k: string]: any;
};

const initialState = {
  members: [] as MemberDataType[]
};

export type MemberReducerType = typeof initialState;

export default createReducer(initialState, (builder) => {
  builder
    .addCase(addBulkMembers, (state, action) => ({
      ...state,
      members: action.payload
    }))
    .addCase(updateProfile, (state, action) => {
      const { email, firstName, lastName, profileImage, id } = action.payload;

      const userIndex = state.members.findIndex((user) => user.user._id === id);

      if (userIndex === -1) return state;

      state.members[userIndex] = {
        ...state.members[userIndex],
        user: {
          ...state.members[userIndex].user,
          email,
          firstName,
          lastName,
          profileImage
        }
      };

      return state;
    })
    .addCase(resetState, (state) => initialState);
});
