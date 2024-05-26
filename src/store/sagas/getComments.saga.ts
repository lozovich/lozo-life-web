/* eslint-disable prettier/prettier */
import { getAllCommentsTaskApi } from 'api';
import { AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { put, takeLatest } from 'redux-saga/effects';
import {
    loadComments,
    loadCommentsFailure,
    loadCommentsSuccess
} from 'store/actions';

function* loadData(action: AnyAction) {
  try {
    const { taskId = '' } = action.payload;
    const data = (yield getAllCommentsTaskApi(taskId)) as AxiosResponse<any>;
    

    yield put({ type: loadCommentsSuccess.toString(), payload: {
        taskId ,
        data :  data.data.data
    } });
  } catch (err: any) {
    yield put({ type: loadCommentsFailure.toString(), payload: err.message });
  }
}

export default function* saga() {
  yield takeLatest(loadComments.toString(), loadData);
}
