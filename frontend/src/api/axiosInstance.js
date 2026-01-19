import axios from 'axios';
import { BASE_URL } from './routes';
import { setupInterceptors } from './interceptors';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5173/',
  headers: { 'Content-Type': 'application/json' },
});

export const apiWithIterceptors = setupInterceptors(axiosInstance);

export default apiWithIterceptors;


