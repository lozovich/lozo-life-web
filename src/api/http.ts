import axios, { AxiosError } from 'axios';
import { userLoggedIn } from 'config/app';
import { toast } from 'react-toastify';

const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

privateAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // @ts-expect-error
    const err: any = error?.response?.data?.msg ?? error?.message;
    toast.error(err);
    if (error.response?.status === 401) {
      userLoggedIn(false);
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

publicAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // @ts-expect-error
    const err: any = error?.response?.data?.msg ?? error?.message;
    toast.error(err);

    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
// eslint-disable-next-line prettier/prettier

