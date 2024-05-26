/* eslint-disable prettier/prettier */
import { getBoardDataApi } from 'api';
import { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import {
  addBulkColumnData,
  addBulkLabels,
  addBulkMembers,
  addBulkTaskData,
  getBoard, getBoardFailure, getBoardSuccess
} from '../actions';

function* loadData(action: any) {
  const { boardId = '' } = action.payload;
  try {
    const { data } = (yield getBoardDataApi({
        boardId,
    })) as AxiosResponse<any>;

    
    const res = data.data;
   
    yield put({
        type : addBulkTaskData.toString(),
        payload : res.tasks
    });


    yield put({
        type : getBoardSuccess.toString(),
        payload : {
          backgroundColor : res.backgroundColor,
          createdBy : res.createdBy,
          name : res.name,
          workspace : res.workspace,
          _id : res._id,

        }
    });
    
    yield put({
        type : addBulkColumnData.toString(),
        payload : {
            columns : res.columns,
            columnOrder: res.columnOrder
        }
    });

    yield put({
      type : addBulkMembers.toString(),
      payload : res?.members ?? []
    });

    yield put({
      type : addBulkLabels.toString(),
      payload : res.labels
  });
   
  } catch (err: any) {
    yield put({
      type: getBoardFailure.toString(),
      payload: err.message
    });
  }
}

export default function* saga() {
  yield takeLatest(getBoard.toString(), loadData);
}
