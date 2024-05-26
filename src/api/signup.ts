import { publicAxios } from './http';

export const generateSignupEmail = (email: string) =>
  publicAxios.post('/user/generate-token-with-email', { email });

export const signupWithEmail = async (
  emailP: string,
  firstNameP: string,
  lastNameP: string,
  passwordP: string
) =>
  publicAxios.post('/auth/signup', {
    email: emailP,
    firstName: firstNameP,
    lastName: lastNameP,
    password: passwordP
  });

export const signupWithGoogle = (tokenId: string) =>
  publicAxios.post('/user/signup-signin-google', { token: tokenId });

export const signInWithEmail = async (email: string, password: string) =>
  publicAxios.post('/user/signin-with-email', { email, password });

export const generateOtpApi = async (payload: any) =>
  publicAxios.post('/user/otp-generate', payload);

export const verifyOtpApi = async (payload: any) =>
  publicAxios.post('/user/verify-otp', payload);

export const resetPasswordApi = async (payload: any) =>
  publicAxios.post('/user/reset-password', payload);
