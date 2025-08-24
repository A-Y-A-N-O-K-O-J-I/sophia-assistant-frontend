import { useState } from 'react';
import { validateForm } from '../utils/validation.js';
import { makeAuthRequest, handleAuthSuccess } from '../services/authAPI.js';

export const useAuthForm = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    adminkey: '',
    mainPhone: '',
    assistantPhone: '',
    adminCode: ''
  });

  // Reset forms
  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setSignupForm({
      name: '',
      email: '',
      password: '',
      adminkey: '',
      mainPhone: '',
      assistantPhone: '',
      adminCode: ''
    });
    setMessage('');
    setFieldErrors({});
  };

  // Handle input changes
  const handleInputChange = (field, value, isLogin = false) => {
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    if (isLogin) {
      setLoginForm(prev => ({ ...prev, [field]: value }));
    } else {
      setSignupForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePhoneChange = (field, value) => {
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setSignupForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e, isSignup = false) => {
    e.preventDefault();
    setMessage('');
    setFieldErrors({});
    
    // Validate form
    const errors = validateForm(isSignup, loginForm, signupForm, userType);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setLoading(true);

    try {
      const { response, data } = await makeAuthRequest(isSignup, userType, loginForm, signupForm);

      if (response.ok) {
        setMessage(data.message || 'Success!');
        setMessageType('success');
        
        if (isSignup) {
          // Redirect to login after successful signup
          setTimeout(() => {
            setCurrentView('login');
            resetForms();
          }, 1500);
        } else {
          handleAuthSuccess(isSignup, userType);
        }
      } else {
        // Handle API errors (400, 500+)
        setMessage(data.error || 'Something went wrong!');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setMessage(error.message || 'Network error occurred');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    currentView,
    setCurrentView,
    userType,
    setUserType,
    loading,
    message,
    messageType,
    fieldErrors,
    loginForm,
    signupForm,
    
    // Functions
    resetForms,
    handleInputChange,
    handlePhoneChange,
    handleSubmit
  };
};