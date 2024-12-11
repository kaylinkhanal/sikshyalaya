// Application constants
export const APP_CONFIG = {
  API_URL: 'https://api.example.com',
  MAX_RETRIES: 3,
  TIMEOUT: 5000,
  PAGE_SIZE: 20,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
};

export const DATE_FORMATS = {
  SHORT: 'MM/DD/YYYY',
  LONG: 'MMMM D, YYYY',
  TIME: 'HH:mm',
  DATETIME: 'MMMM D, YYYY HH:mm',
};