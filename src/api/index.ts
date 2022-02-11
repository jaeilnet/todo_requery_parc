import axios, { AxiosResponse } from "axios";
import { EditText } from "../components/type";
import { SignInType } from "../page/Login";

const baseUrl = "http://0.0.0.0:9002/api/v2";

const instance = axios.create({
  baseURL: baseUrl,
});

export const getApi = async () => {
  return await instance.get(`${baseUrl}/todo`);
};

export const addTodoAPI = async (content: string) => {
  return await instance.post(`${baseUrl}/todo`);
};

export const deleteApi = async (id: number) => {
  return await instance.delete(`${baseUrl}/todo`, {
    data: {
      id: id,
    },
  });
};

export const patchStatusApi = async (id: number) => {
  return await instance.patch(`${baseUrl}/todo`, {
    id: id,
  });
};

export const patchTextAPI = async ({ id, contents }: EditText) => {
  console.log(id, contents);
  return await instance.patch(`${baseUrl}/todo/editTodo`, {
    id,
    contents,
  });
};

export const postLoginAPI = async ({ userId, password }: SignInType) => {
  return await instance.post(`${baseUrl}/todo/auth/auth0`, {
    userId,
    password,
  });
};

export const loginCheckAPI = async (token: string) => {
  return await instance.post(`${baseUrl}/todo/auth/auth0`, {
    token: token,
  });
};
