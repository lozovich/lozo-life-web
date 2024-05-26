import { createAction } from '@reduxjs/toolkit';
import { addLabelToBoardApi, updateBoardBackgroundApi } from 'api';
import { Dispatch } from 'react';
import { LabelType } from 'store/reducers/label.reducer';
import { MemberDataType } from 'store/reducers/members.reducer';

export type BoardPayload = {
  name: string;
  backgroundColor: string;
  workspace: string;
  [key: string]: string | undefined;
};
type ChangeBackgroundType = {
  backgroundColor: string;
  boardId: string;
  workspace: string;
};

export const createBoard = createAction<BoardPayload>('CREATE_BOARD');
export const createBoardSuccess = createAction('CREATE_BOARD_SUCCESS');
export const createBoardFailure = createAction('CREATE_BOARD_FAILURE');

export const getBoard = createAction<{ boardId: string }>('GET_BOARD');
export const getBoardSuccess = createAction('GET_BOARD_SUCCESS');
export const getBoardFailure = createAction('GET_BOARD_FAILURE');

export const addLabels = createAction<LabelType>('ADD_LABELS');
export const editLabel = createAction<LabelType>('EDIT_LABELS');

export const addBulkLabels = createAction<LabelType[]>('ADD_BULK_LABELS');
export const addBulkMembers =
  createAction<MemberDataType[]>('ADD_BULK_MEMBERS');
export const changeBackground =
  createAction<ChangeBackgroundType>('CHANGE_BACKGROUND');

export const addLabelBatch = async (payload: any) => {
  const { dispatch, name, labelId, backgroundColor, boardId } = payload;
  dispatch(addLabels({ name, labelId, backgroundColor, boardId }));

  await addLabelToBoardApi({
    name,
    labelId,
    backgroundColor,
    boardId
  });
};

export const changeBackgroundAction = ({
  dispatch,
  data
}: {
  dispatch: Dispatch<any>;
  data: ChangeBackgroundType;
}) => {
  dispatch(changeBackground(data));
  updateBoardBackgroundApi(data);
};
