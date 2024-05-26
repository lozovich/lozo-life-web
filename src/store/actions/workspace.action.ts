import { createAction } from '@reduxjs/toolkit';

export type WorkspacePayload = {
  name: string;
  description: string;
  [key: string]: string | undefined;
};

export const createWorkspace =
  createAction<WorkspacePayload>('CREATE_WORKSPACE');
export const createWorkspaceSuccess = createAction('CREATE_WORKSPACE_SUCCESS');
export const createWorkspaceFailure = createAction('CREATE_WORKSPACE_FAILURE');
