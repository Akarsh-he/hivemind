import axios from 'axios';

// Dynamic API Base URL configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout for Render free tier cold-start spin-ups
});

// Cold-start detection event subscriber mechanism
let activePendingRequests = 0;
let coldStartTimer = null;
const listeners = new Set();

const notifyListeners = (isPending) => {
  listeners.forEach((cb) => cb(isPending));
};

export const onColdStartChange = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

apiClient.interceptors.request.use(
  (config) => {
    activePendingRequests++;
    if (activePendingRequests === 1 && !coldStartTimer) {
      coldStartTimer = setTimeout(() => {
        if (activePendingRequests > 0) {
          notifyListeners(true);
        }
      }, 1500);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleRequestComplete = () => {
  activePendingRequests = Math.max(0, activePendingRequests - 1);
  if (activePendingRequests === 0) {
    if (coldStartTimer) {
      clearTimeout(coldStartTimer);
      coldStartTimer = null;
    }
    notifyListeners(false);
  }
};

apiClient.interceptors.response.use(
  (response) => {
    handleRequestComplete();
    return response;
  },
  (error) => {
    handleRequestComplete();
    return Promise.reject(error);
  }
);

export const fetchProjects = async (category = 'All', search = '') => {
  try {
    const params = {};
    if (category && category !== 'All') params.category = category;
    if (search) params.search = search;

    const response = await apiClient.get('/projects', { params });
    return response.data;
  } catch (error) {
    console.warn('API connection offline or delayed, error:', error.message);
    throw error;
  }
};

export const fetchTeam = async () => {
  try {
    const response = await apiClient.get('/team');
    return response.data;
  } catch (error) {
    console.warn('API connection offline or delayed, error:', error.message);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to submit contact form.');
    }
    throw new Error('Network error. Failed to communicate with Express backend.');
  }
};

export default apiClient;
export { apiClient };
