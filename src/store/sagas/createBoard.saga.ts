/* eslint-disable prettier/prettier */
import { createBoardApi } from 'api';
import { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
  addBoardToWorkSpace,
  createBoard,
  createBoardFailure,
  createBoardSuccess
} from '../actions';

function* loadData(action: any) {
  const { name, backgroundColor, workspace, history } = action.payload;
  try {
    const { data } = (yield createBoardApi({
      name,
      backgroundColor,
      workspace
    })) as AxiosResponse<any>;

    yield put({
      type: createBoardSuccess.toString()
    });

     yield put({
      type: addBoardToWorkSpace.toString(),
      payload : {
        _id : data.data.boardId,
        name ,
        backgroundColor , 
        workspace
      }
    });

    history.goBack();
  } catch (err: any) {
    yield put({
      type: createBoardFailure.toString(),
      payload: err.message
    });
  }
}

export default function* saga() {
  yield takeLatest(createBoard.toString(), loadData);
}
