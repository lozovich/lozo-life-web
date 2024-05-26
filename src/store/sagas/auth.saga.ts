import { checkAuthApi } from 'api';
import { AxiosResponse } from 'axios';
import { userLoggedIn } from 'config/app';
import { put, takeLatest } from 'redux-saga/effects';
import { authLoad, authLoadFailure, authLoadSuccess } from '../actions';

function* loadData(action: any) {
  try {
    const { history = undefined, path = '' } = action.payload;
    const { data } = (yield checkAuthApi()) as AxiosResponse<any>;

    yield put({ type: authLoadSuccess.toString(), payload: data?.data });
    userLoggedIn(true);
    if (history && path) {
      history.replace(path);
    }
  } catch (err: any) {
    const { history = undefined, path = '' } = action.payload;
    yield put({ type: authLoadFailure.toString(), payload: err.message });
    userLoggedIn(false);

    if (history) {
      history.replace('/');
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* authSaga() {
  yield takeLatest(authLoad.toString(), loadData);
}
