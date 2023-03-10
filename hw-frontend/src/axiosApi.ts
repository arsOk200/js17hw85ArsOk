import axios, {AxiosHeaders, AxiosRequestConfig} from 'axios';
import { apiUrl } from './constants';
import {RootState} from "./app/store";
import {Store} from "@reduxjs/toolkit";

const axiosApi = axios.create({
  baseURL: apiUrl
});
export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config:AxiosRequestConfig)=> {
    const token = store.getState().users.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization', token);
    return config;
  })

}

export default axiosApi;

