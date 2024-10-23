import axios from 'axios';
import { Toast } from 'toastify-react-native';

const Axios = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
