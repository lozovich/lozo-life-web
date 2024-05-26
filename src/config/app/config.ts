/* eslint-disable no-bitwise */
import { AxiosError } from 'axios';
import React from 'react';
import { GoogleLoginResponse } from 'react-google-login';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import validator from 'validator';

type ValidatorMethodType = {
  state: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
};

/* eslint-disable import/prefer-default-export */
export const LABEL_COLORS = [
  '#61BD4F',
  '#F2D600',
  '#FF9F1A',
  '#EB5A46',
  '#C377E0',
  '#0079BF',
  '#00C2E0',
  '#51E898',
  '#FF78CB',
  '#344563'
];

// eslint-disable-next-line no-shadow
export enum STEPS {
  email = 'email',
  otp = 'otp',
  password = 'password'
}

export const throwError = (err: AxiosError<any, any>) => {
  const message = err?.response?.data?.msg ?? err.message;
  return toast.error(message);
};

export const refreshTokenSetup = (
  // eslint-disable-next-line no-unused-vars
  _res: GoogleLoginResponse
) => {
  let refreshTiming = (_res?.tokenObj?.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await _res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

export const handleValidator = ({ state, setErrors }: ValidatorMethodType) => {
  let flag = false;

  Object.entries(state).forEach((value: any) => {
    const [key, val] = value;

    if (validator.isEmpty(val)) {
      flag = true;
      setErrors((prevState: any) => ({
        ...prevState,
        [key]: true
      }));
    }
    if (key === 'email' && !validator.isEmail(val)) {
      flag = true;
      setErrors((prevState: any) => ({
        ...prevState,
        [key]: true
      }));
    }
    if (key === 'password' && !validator.isStrongPassword(val)) {
      flag = true;
      setErrors((prevState: any) => ({
        ...prevState,
        [key]: true
      }));
    }
  });

  return flag;
};

export const userLoggedIn = (status: boolean) =>
  localStorage.setItem('auth', JSON.stringify(status));

export const titleLettersConvert = (string: string) =>
  string.slice(0, 1).toUpperCase();

export const getId = () => v4();

export const getTitleName = (firstName: string, lastName: string) => {
  const firstNameChar = firstName.charAt(0).toUpperCase();
  const lastNameChar = lastName.charAt(0).toUpperCase();

  return firstNameChar + lastNameChar;
};

export const darkenColor = (colorCode: string, val: number) => {
  let hasPound = false;
  let color = colorCode;

  if (color[0] === '#') {
    color = color.slice(1);
    hasPound = true;
  }

  if (color.length <= 6) {
    const num = parseInt(color, 16);
    let r = (num >> 16) + val;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + val;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + val;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (hasPound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }

  return colorCode;
};
