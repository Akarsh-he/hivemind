import axios from 'axios';

// API Base URL - defaults to Express backend on port 5000 in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

export const fetchProjects = async (category = 'All', search = '') => {
  try {
    const params = {};
    if (category && category !== 'All') params.category = category;
    if (search) params.search = search;

    const response = await apiClient.get('/projects', { params });
    return response.data;
  } catch (error) {
    console.warn('API connection offline, using client fallback dataset:', error.message);
    throw error;
  }
};

export const fetchTeam = async () => {
  try {
    const response = await apiClient.get('/team');
    return response.data;
  } catch (error) {
    console.warn('API connection offline, using client fallback team dataset:', error.message);
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
