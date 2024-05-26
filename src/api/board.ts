import { BoardPayload } from 'store/actions';
import { privateAxios } from './http';

export const createBoardApi = async (payload: BoardPayload) =>
  privateAxios.post('/user/board', payload);

export const getBoardDataApi = async ({ boardId }: { boardId: string }) =>
  privateAxios.post('/user/get-board-data', { boardId });

export const addLabelToBoardApi = async (payload: any) =>
  privateAxios.post('/user/add-labels', payload);

export const updateLabelToBoardApi = async (payload: any) =>
  privateAxios.put('/user/update-labels', payload);

export const updateBoardBackgroundApi = async (payload: any) =>
  privateAxios.put('/user/change-background', payload);
