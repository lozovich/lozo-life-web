import { privateAxios } from './http';

export const getHomeApi = () => privateAxios.get('/user/home');
