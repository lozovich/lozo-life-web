/* eslint-disable prettier/prettier */
import { createAction } from '@reduxjs/toolkit';
import { updateProfileApi } from 'api';
import { Dispatch } from 'react';

type UpdateProfile = {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    id: string,
    hasImageChange: boolean
};

export const profileLoad = createAction('PROFILE_LOAD');
export const profileLoadSuccess = createAction('PROFILE_LOAD_SUCCESS');
export const profileLoadFailure = createAction('PROFILE_LOAD_FAILURE');
export const updateProfile = createAction<UpdateProfile>('UPDATE_PROFILE');

export const updateProfileAction = async ({
    dispatch,
    data
}: {
    dispatch: Dispatch<any>;
    data: UpdateProfile;
}) => {

    dispatch(updateProfile(data));
    updateProfileApi(data);
};
