// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  CLIENTS: {
    LIST: '/clients',
    CREATE: '/clients',
    UPDATE: '/clients/:id',
    DELETE: '/clients/:id',
  },
  ROUTER: {
    STATUS: '/router/status',
    CONFIG: '/router/config',
  },
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};
