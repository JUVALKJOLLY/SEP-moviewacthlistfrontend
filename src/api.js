import axios from 'axios';

// Determine API base URL based on environment
const API_BASE = import.meta.env.VITE_API_URL || (
  import.meta.env.MODE === 'production' 
    ? 'https://mymovie.com/api'
    : 'http://127.0.0.1:8000'
);

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : '';
}

async function ensureCsrfToken() {
  const existingToken = getCookie('csrftoken');
  if (existingToken) return;

  try {
    await axiosInstance.get('/api/csrf/');
  } catch (error) {
    // Ignore missing/failed CSRF bootstrap; the server may already have a cookie.
  }
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle CSRF token for non-GET requests
axiosInstance.interceptors.request.use(async (config) => {
  const method = (config.method || 'get').toLowerCase();
  if (method !== 'get') {
    await ensureCsrfToken();
    const csrfToken = getCookie('csrftoken');
    if (csrfToken && config.headers) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
});

export async function apiFetch(url, options = {}) {
  try {
    const response = await axiosInstance({
      url,
      method: options.method || 'GET',
      data: options.body,
      headers: options.headers,
    });
    const detail = response.data?.detail || response.data?.message || '';

    // Wrap axios response to match fetch API interface
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      statusText: response.statusText || detail || 'OK',
      headers: {
        get: (name) => response.headers[name.toLowerCase()],
      },
      json: async () => response.data,
      text: async () => JSON.stringify(response.data),
      data: response.data,
    };
  } catch (error) {
    const status = error.response?.status || 500;
    const data = error.response?.data || { detail: error.message || 'Request failed' };
    const serverMessage = data.detail || data.message || error.message || 'Request failed';
    const statusText = error.response?.statusText || serverMessage;

    return {
      ok: false,
      status,
      statusText,
      headers: {
        get: (name) => error.response?.headers?.[name.toLowerCase()],
      },
      json: async () => data,
      text: async () => JSON.stringify(data),
      data,
    };
  }
}

export async function parseResponse(response) {
  const contentType = response.headers.get('content-type');
  
  // Check if response is JSON
  if (contentType && contentType.includes('application/json')) {
    return response.data || (await response.json());
  }
  
  // If not JSON, try to parse as text and return a structured error
  const text = await response.text();
  
  // Return a structured error object
  return {
    detail: `Server error (${response.status}): ${text.substring(0, 100)}...`,
    isHtmlError: true,
    status: response.status,
    rawResponse: text.substring(0, 500),
  };
}
