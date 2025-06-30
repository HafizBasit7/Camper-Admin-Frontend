// src/api/api.js
import axios from 'axios';
import { getToken, clearToken } from '../../utils/index';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' }
});

// —— request: attach JWT ——
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// —— response: logout on 401 ——
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) clearToken(); // kick to login page
    return Promise.reject(err);
  }
);

export default api;