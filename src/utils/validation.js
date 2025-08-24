import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

export function removePlus(number) {
  const formattedPhone = number.split("+")[1];
  return formattedPhone;
}

// Validate phone number using libphonenumber-js
export const validatePhone = (phone) => {
  if (!phone) return { isValid: false, error: 'Phone number is required' };
  
  try {
    const phoneNumber = parsePhoneNumber(phone);
    if (!phoneNumber || !isValidPhoneNumber(phone)) {
      return { isValid: false, error: 'Invalid phone number format' };
    }
    return { isValid: true, formatted: phoneNumber.formatInternational() };
  } catch (error) {
    return { isValid: false, error: 'Invalid phone number format' };
  }
};

// Validate form fields
export const validateForm = (isSignup, loginForm, signupForm, userType) => {
  const errors = {};
  
  if (isSignup) {
    // Name validation
    if (!signupForm.name.trim()) {
      errors.name = 'Full name is required';
    }
    
    // Email validation
    if (!signupForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!signupForm.password) {
      errors.password = 'Password is required';
    } else if (signupForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // User type specific validation
    if (userType === 'superadmin') {
      if (!signupForm.adminkey) {
        errors.adminkey = 'Admin key is required';
      }
    } else if (userType === 'user') {
      if (!signupForm.adminCode) {
        errors.adminCode = 'Admin code is required';
      }
      
      // Phone validation
      if (!signupForm.mainPhone) {
        errors.mainPhone = 'Main phone number is required';
      } else {
        const phoneValidation = validatePhone(signupForm.mainPhone);
        if (!phoneValidation.isValid) {
          errors.mainPhone = phoneValidation.error;
        }
      }
      
      if (!signupForm.assistantPhone) {
        errors.assistantPhone = 'Assistant phone number is required';
      } else {
        const phoneValidation = validatePhone(signupForm.assistantPhone);
        if (!phoneValidation.isValid) {
          errors.assistantPhone = phoneValidation.error;
        }
      }
    }
  } else {
    // Login validation
    if (!loginForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!loginForm.password) {
      errors.password = 'Password is required';
    }
  }
  
  return errors;
};