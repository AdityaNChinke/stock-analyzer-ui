import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Connection state tracker for UI status indicator
let isBackendLive = false;
const connectionListeners = new Set();

export const subscribeToBackendStatus = (listener) => {
  connectionListeners.add(listener);
  listener(isBackendLive);
  return () => connectionListeners.delete(listener);
};

const notifyStatus = (status) => {
  if (isBackendLive !== status) {
    isBackendLive = status;
    connectionListeners.forEach((fn) => fn(isBackendLive));
  }
};

// Create Axios Instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Auto-unwrap Spring Boot envelope and notify live status
apiClient.interceptors.response.use(
  (response) => {
    notifyStatus(true);
    // If Spring Boot wraps response in { success: true, data: [...] }
    if (response.data && response.data.success !== undefined && response.data.data !== undefined) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    if (!error.response || error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
      notifyStatus(false);
      console.warn(`[StockAnalyzer API] Backend at ${API_BASE_URL} is unreachable. Falling back to local data.`);
    } else {
      console.error(`[StockAnalyzer API] Server Error (${error.response.status}):`, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
