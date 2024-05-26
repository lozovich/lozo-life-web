/* eslint-disable prettier/prettier */
import axios, { AxiosResponse } from 'axios';
import { privateAxios } from './http';

export type CloudinaryUploadApiPayload = {
    data: FormData;
};


const uploadImageApi = async ({ data }: CloudinaryUploadApiPayload) => axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});




const getSignatureToUploadApi = async (folder: string) => privateAxios.post('/user/get-signature', { folder });


export const uploadFileToCloudinary = async ({
    folder,
    file
}: {
    folder: string,
    file: File
}) => {

    const { data } = (await getSignatureToUploadApi(folder)) as AxiosResponse<any>;

    const { signature, timestamp } = data.data;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET ?? '');
    formData.append('transformation', 'q_auto:good');
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY ?? '');

    return uploadImageApi({ data: formData });
};

