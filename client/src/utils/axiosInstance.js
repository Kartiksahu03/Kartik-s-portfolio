// ============================================
// Axios Instance
// Central place for all API calls — attaches the admin token automatically
// ============================================

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach the admin token (if logged in) to every request
axiosInstance.interceptors.request.use(
  (config) => {
    // We read straight from localStorage here to keep this file simple
    // and avoid a circular import with the redux store.
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// If the token is invalid/expired, clear it so the user gets sent back to login
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
