// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Phone number validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const isRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== '';
};

// Min length validation
export const minLength = (value, min) => {
  return String(value).length >= min;
};

// Max length validation
export const maxLength = (value, max) => {
  return String(value).length <= max;
};

// Numeric validation
export const isNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

// Positive number validation
export const isPositiveNumber = (value) => {
  return isNumeric(value) && parseFloat(value) > 0;
};
