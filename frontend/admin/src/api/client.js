import axios from 'axios';

const API_URL = import.meta.env.PROD
  ? 'https://alpha-interior.onrender.com/api'
  : '/api';
const API = axios.create({ baseURL: API_URL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use((res) => res, (err) => {
  if (err.response?.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  }
  return Promise.reject(err);
});

export default API;
