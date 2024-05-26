import { createWorkSpace as createWorkSpaceApi } from 'api';
import { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
  addWorkspaceToHome,
  createWorkspace,
  createWorkspaceFailure,
  createWorkspaceSuccess
} from '../actions';

function* loadData(action: any) {
  const { name, description, history } = action.payload;
  try {
    const { data } = (yield createWorkSpaceApi({
      name,
      description
    })) as AxiosResponse<any>;

    yield put({
      type: createWorkspaceSuccess.toString()
    });
    yield put({
      type: addWorkspaceToHome.toString(),
      payload: { _id: data.data._id, name, description }
    });
    history.goBack();
  } catch (err: any) {
    yield put({
      type: createWorkspaceFailure.toString(),
      payload: err.message
    });
  }
}

export function* workspaceSaga() {
  yield takeLatest(createWorkspace.toString(), loadData);
}
