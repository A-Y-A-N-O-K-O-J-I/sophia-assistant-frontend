import { parsePhoneNumber } from 'libphonenumber-js';
import { validatePhone, removePlus } from '../utils/validation.js';

const API_URL = import.meta.env.VITE_API_URL;

// Get appropriate endpoint based on user type and action
const getEndpoint = (isSignup, userType) => {
  if (isSignup) {
    if (userType === 'superadmin') {
      return '/super-admin/signup';
    } else if (userType === 'user') {
      return '/user/signup';
    }
  } else {
    // Login endpoints
    if (userType === 'superadmin') {
      return '/super-admin/login';
    } else if (userType === 'admin') {
      return '/admin/login';
    } else {
      return '/user/login';
    }
  }
};

// Prepare request body based on user type and action
const prepareRequestBody = (isSignup, userType, loginForm, signupForm) => {
  if (isSignup) {
    if (userType === 'superadmin') {
      return {
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
        adminkey: signupForm.adminkey
      };
    } else if (userType === 'user') {
      // Validate and format phones before sending
      return {
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
        mainPhone: removePlus(parsePhoneNumber(signupForm.mainPhone).number),
        assistantPhone: removePlus(parsePhoneNumber(signupForm.assistantPhone).number),
        adminCode: signupForm.adminCode
      };
    }
  } else {
    // Login body
    return {
      email: loginForm.email,
      password: loginForm.password
    };
  }
};

// Make API request
export const makeAuthRequest = async (isSignup, userType, loginForm, signupForm) => {
  const endpoint = getEndpoint(isSignup, userType);
  const body = prepareRequestBody(isSignup, userType, loginForm, signupForm);

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: "include"
  });

  const data = await response.json();
  
  return { response, data };
};

// Handle redirect after successful auth
export const handleAuthSuccess = (isSignup, userType) => {
  if (isSignup) {
    // Will be handled by the component (redirect to login)
    return;
  }
  
  // Login success - redirect to appropriate dashboard
  setTimeout(() => {
    if (userType === 'superadmin') {
      window.location.href = '/super-admin/dashboard';
    } else if (userType === 'admin') {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/dashboard';
    }
  }, 1500);
};