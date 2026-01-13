import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

const api: AxiosInstance = axios.create({
  baseURL: 'https://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor: handle global errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized → token may be invalid or expired');
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      // Optionally trigger logout navigation here
    }
    return Promise.reject(error);
  }
);

export default api;
