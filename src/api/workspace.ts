import { privateAxios } from './http';

export const createWorkSpace = async ({
  name,
  description
}: {
  name: string;
  description: string;
}) => privateAxios.post('/user/create-workspace', { name, description });
