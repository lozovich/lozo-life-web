import { all } from 'redux-saga/effects';
import addTaskSaga from './addTask.saga';
import { authSaga } from './auth.saga';
import createBoardSaga from './createBoard.saga';
import createList from './createList.saga';
import getBoardSaga from './getBoard.saga';
import GetCommentSaga from './getComments.saga';
import homeSaga from './home.saga';
import profileSaga from './profile.saga';
import UpdateListTaskPosSage from './updateListTaskPos.saga';
import { workspaceSaga } from './workpase.saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    workspaceSaga(),
    homeSaga(),
    createBoardSaga(),
    createList(),
    addTaskSaga(),
    getBoardSaga(),
    UpdateListTaskPosSage(),
    GetCommentSaga()
  ]);
}
