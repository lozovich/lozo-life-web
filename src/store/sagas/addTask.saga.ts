import { addTaskApi } from 'api';
import { AnyAction } from 'redux';
import { takeLatest } from 'redux-saga/effects';
import { addTask } from 'store/actions';

function* loadData(action: AnyAction) {
  try {
    const {
      taskId = '',
      content = '',
      boardId = '',
      listId = '',
      avoidApiCall = false
    } = action.payload;
    const payload = {
      content,
      listId,
      boardId,
      taskId
    };

    if (!avoidApiCall) yield addTaskApi(payload);
  } catch (err: any) {
    // console.error(err);
  }
}

export default function* saga() {
  yield takeLatest(addTask.toString(), loadData);
}
