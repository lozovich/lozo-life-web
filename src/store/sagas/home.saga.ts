import { getHomeApi } from 'api';
import { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { homeLoad, homeLoadFailure, homeLoadSuccess } from '../actions';

function* loadData() {
  try {
    const { data } = (yield getHomeApi()) as AxiosResponse<any>;

    yield put({
      type: homeLoadSuccess.toString(),
      payload: data.data
    });
  } catch (err: any) {
    yield put({
      type: homeLoadFailure.toString(),
      payload: err.message
    });
  }
}

export default function* homeSaga() {
  yield takeLatest(homeLoad.toString(), loadData);
}
