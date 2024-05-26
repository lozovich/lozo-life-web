/* eslint-disable prettier/prettier */
import { privateAxios } from './http';

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () => privateAxios.get('/user/profile');
export const inviteApi = (payload: any) => privateAxios.post('/user/invite', payload);
export const acceptInvite = (payload: any) => privateAxios.patch('/user/accept-invite', payload);
export const updateProfileApi = (payload: any) =>
    privateAxios.put('/user/update-profile', payload);
export const getInviteInfo = (payload: any) => privateAxios.post('/user/invite-info', payload);