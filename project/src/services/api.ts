import { getToken } from './token';
import axios from 'axios';
import { BASE_SERVER_URL, REQUEST_TIMEOUT } from '../const';

export const getApi = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_SERVER_URL,
    timeout: REQUEST_TIMEOUT
  });

  axiosInstance.interceptors.request.use((req) => {
    const token = getToken();

    if(req.headers && token) {
      req.headers['X-Token'] = token;
    }

    return req;
  });

  return axiosInstance;
};
