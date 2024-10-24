import axios from 'axios';
import { Toast } from 'toastify-react-native';

const Axios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Toast.error(error.message);
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    Toast.error(error.message);
    return Promise.reject(error);
  },
);

export default Axios;
