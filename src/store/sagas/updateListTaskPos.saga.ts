/* eslint-disable prettier/prettier */
import { updateTaskAndColumnPosApi } from 'api';
import { AnyAction } from 'redux';
import { put, takeLatest } from 'redux-saga/effects';
import {
  updateTaskAndColumnPosition,
  updateTaskAndColumnPositionFailure,
  updateTaskAndColumnPositionSuccess
} from 'store/actions';

function* loadData(action: AnyAction) {
  try {
    const { draggableId = '', order = 0, listId = '', type = '', source = '', destination = '', boardId = '', avoidApiCall = false } = action.payload;
    const payload = {
      draggableId,
      order,
      listId,
      type,
      source,
      destination,
      boardId
    };

    if (!avoidApiCall)
      yield updateTaskAndColumnPosApi(payload);

    yield put({
      type: updateTaskAndColumnPositionSuccess.toString()
    });
  } catch (err: any) {
    yield put({
      type: updateTaskAndColumnPositionFailure.toString(),
      payload: err.message
    });
  }
}

export default function* saga() {
  yield takeLatest(updateTaskAndColumnPosition.toString(), loadData);
}
