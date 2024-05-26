import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './auth.reducer';
import BoardReducer from './board.reducer';
import ColumReducer from './column.reducer';
import LoadCommentReducer from './comments.reducer';
import CreateBoardedReducer from './createBoard.reducer';
import HomeReducer from './home.reducer';
import LabelReducer from './label.reducer';
import MemberReducer from './members.reducer';
import profileReducer from './profile.reducer';
import TaskReducer from './task.reducer';
import WorkspaceReducer from './workspace.reducer';

export default combineReducers({
  AuthReducer: authReducer,
  ProfileReducer: profileReducer,
  WorkspaceReducer,
  HomeReducer,
  CreateBoardedReducer,
  TaskReducer,
  ColumReducer,
  BoardReducer,
  LabelReducer,
  MemberReducer,
  LoadCommentReducer
});
