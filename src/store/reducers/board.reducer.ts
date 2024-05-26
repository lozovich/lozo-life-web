/* eslint-disable prettier/prettier */
import { createReducer } from '@reduxjs/toolkit';
import {
  changeBackground,
  getBoard, getBoardFailure, getBoardSuccess, resetState
} from 'store/actions';


type BoardOwnerType = {
  _id: string,
  'firstName': string,
  'lastName': string,
  'email': string,
  'profileImage': string,
  [key: string]: any

}

// type MembersType = {
//   _id: string,
//   memberId: string
//   role : Uppercase<string>,
//   boardId: string,
//   user : BoardOwnerType | null,
//   [key : string] : any
// }


export type BoardReducerDataType = {
  _id: string,
  name: string,
  backgroundColor: string,
  createdBy: string,
  workspace: string,
  updatedAt: string,
  boardOwner: BoardOwnerType | null,
}


const initialState = {
  loading: false,
  error: '',
  data: {} as BoardReducerDataType | null
};

export type BoardReducerType = typeof initialState

export default createReducer(initialState, (builder) => {
  builder
    .addCase(getBoard, (state) => ({
      ...state,
      loading: true,
      error: '',
    }))
    .addCase(getBoardSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: '',
      data: action.payload ?? null
    }))
    .addCase(getBoardFailure, (state, action) => ({
      ...state,
      error: action.payload ?? '',
      loading: false
    }))
    .addCase(changeBackground, (state, action) => {
      const newState = { ...state };
      const newData = { ...state.data };
      newData.backgroundColor = action.payload.backgroundColor;
      // @ts-expect-error
      newState.data = newData;

      return newState;
    })
    .addCase(resetState, (state) => initialState);
});
