import axios from 'axios';
import { BASE_SERVER_URL, REQUEST_TIMEOUT } from './const';

export const getApi = () => axios.create({
  baseURL: BASE_SERVER_URL,
  timeout: REQUEST_TIMEOUT
});
