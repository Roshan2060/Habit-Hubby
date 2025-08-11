// src/api.js
import axios from 'axios';

const BASE_URL = 'https://habit-hubby-2.onrender.com/api/v1';
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh/`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export async function login(username, password) {
  const response = await api.post('/auth/login/', { username, password });
  localStorage.setItem('access_token', response.data.access_token);
  return response.data;
}

export async function logout() {
  await api.post('/auth/logout/');
  localStorage.removeItem('access_token');
}

export async function fetchSections() {
  const response = await api.get('/sections/');
  return response.data;
}

export async function updateTaskCompletion(taskId, completed) {
  const response = await api.patch(`/tasks/${taskId}/`, { completed });
  return response.data;
}

export default api;
