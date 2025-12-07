export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // User endpoints
  USER: {
    SIGNUP: '/users/signup',
    LOGIN: '/users/login',
    LOGOUT: '/users/logout',
    CHECK_AUTH: '/users/checkAuth',
  },
  
  // Professional endpoints
  PROFESSIONAL: {
    SIGNUP: '/professional/signup',
    LOGIN: '/professional/login',
    LOGOUT: '/professional/logout',
    UPLOAD_DOC: '/professional/upload-doc',
    GET_VERIFIED: '/professional/verified',
    GET_UNVERIFIED: '/professional/unverified',
  },
  
  // Admin endpoints
  ADMIN: {
    LOGIN: '/admin/login',
    LOGOUT: '/admin/logout',
    DASHBOARD: '/admin/dashboard',
    INSERT: '/admin/insert',
  },
  
  // AI Chat endpoints
  AI_CHAT: {
    GEMINI: '/ai-chat/gemini',
  },
};

