import { publicAxios } from './http';

export const checkAuthApi = async () => publicAxios.get('/user/check-auth');
export const signOut = async () => publicAxios.get('/user/signout');
