/**
 * Application Configuration
 * 
 * Update these values to connect to your FastAPI backend
 */

// API Configuration
export const API_CONFIG = {
  // Change this to your FastAPI backend URL
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:8000',
  
  // Enable mock mode for development without backend
  USE_MOCK: false,
  
  // JWT token storage key
  TOKEN_KEY: 'linkshort_token',
  USER_KEY: 'linkshort_user',
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/register',
  },
  URLS: {
    LIST: '/urls',
    CREATE: '/urls',
    UPDATE: (id) => `/urls/${id}`,
    DELETE: (id) => `/urls/${id}`,
    ANALYTICS: (id) => `/urls/${id}/analytics`,
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    DEVICE: '/analytics/device',
    COUNTRY: '/analytics/country',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE: '/user/delete',
  },
}

// App Configuration
export const APP_CONFIG = {
  NAME: 'LinkShort',
  SHORT_DOMAIN: 'http://127.0.0.1:8000',
  DEFAULT_AVATAR_SEED: 'default',
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
}

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
}
