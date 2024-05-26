/* eslint-disable prettier/prettier */
import { addList } from 'api';
import { AnyAction } from 'redux';
import { takeLatest } from 'redux-saga/effects';
import {
  createList
} from 'store/actions';

function* loadData(action: AnyAction) {
  try {
    const { listId = '', title = '', boardId = '', avoidApiCall = false } = action.payload;
    const payload = {
      title,
      listId,
      boardId
    };

    if (!avoidApiCall)
      yield addList(payload);

    // yield put({ type: createListSuccess.toString(), payload: data.data });
  } catch (err: any) {
    // console.error(err);
    // yield put({ type: createListFailure.toString(), payload: err.message });
  }
}

export default function* saga() {
  yield takeLatest(createList.toString(), loadData);
}
