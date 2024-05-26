import { privateAxios } from './http';

export const addList = (payload: any) =>
  privateAxios.post('/user/add-list', payload);

export const addTaskApi = (payload: any) =>
  privateAxios.post('/user/add-task', payload);

export const updateTaskAndColumnPosApi = (payload: any) =>
  privateAxios.put('/user/update-task-column', payload);

export const addDescriptionToTask = (payload: any) =>
  privateAxios.put('/user/add-task-info', payload);

export const updateTaskLabelsApi = (payload: any) =>
  privateAxios.put('/user/update-task-labels', payload);

export const updateCheckListApi = (payload: any) =>
  privateAxios.put('/user/update-checklist', payload);

export const addCheckListGroupApi = (payload: any) =>
  privateAxios.post('/user/add-checklist-group', payload);

export const deleteACheckList = (payload: any) =>
  privateAxios.post('/user/delete-checkList', payload);

export const deleteCheckListGroupApi = (payload: any) =>
  privateAxios.post('/user/delete-checkList-group', payload);

export const toggleMemberTask = (payload: any) =>
  privateAxios.post('/user/toggle-members-task', payload);

export const addCommentToTaskApi = (payload: any) =>
  privateAxios.post('/user/add-comment-task', payload);

export const getAllCommentsTaskApi = (taskId: string) =>
  privateAxios.get(`/user/all-comments-task/${taskId}`);

export const deleteCommentsApi = (payload: any) =>
  privateAxios.post('/user/delete-comment', payload);

export const deleteTaskLabelApi = (labelId: string) =>
  privateAxios.post('/user/delete-labels', { labelId });

export const deleteTaskByIdApi = (payload: any) =>
  privateAxios.post('/user/delete-task-by-id', payload);

export const deleteColumnByIdApi = (payload: any) =>
  privateAxios.post('/user/delete-list', payload);
