// utils/axiosInterceptor.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('403 detected, refreshing token...');
        
        // Call refresh token endpoint
        await apiClient.post('/refresh-token');
        
        console.log('Token refreshed, retrying original request...');
        // Retry the original request
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        console.log('Token refresh failed, redirecting to login...');
        // If refresh fails, redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;