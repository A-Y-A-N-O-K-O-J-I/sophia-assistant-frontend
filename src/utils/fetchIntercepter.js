// utils/fetchInterceptor.js
const API_URL = import.meta.env.VITE_API_URL;

const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const [url, options = {}] = args;
  
  const makeRequest = async (isRetry = false) => {
    const response = await originalFetch(url, {
      credentials: 'include',
      ...options
    });
    if ((response.status === 401 || response.status === 403 || response.status === 400) && !isRetry) {
      try {
        // Refresh token
        const refreshResponse = await originalFetch(`${API_URL}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include'
        });

        if (refreshResponse.ok) {
          // Retry original request
          return makeRequest(true);
        } else {
          window.location.href = '/auth';
          return response;
        }
      } catch (error) {
        window.location.href = '/auth';
        return response;
      }
    }
    
    return response;
  };

  return makeRequest();
};

export default {};