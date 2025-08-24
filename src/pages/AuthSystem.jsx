import React from 'react';
import { motion } from 'framer-motion';
import { useAuthForm } from '../hooks/useAuthForm.js';
import UserTypeSelector from '../components/UserTypeSelector.jsx';
import AuthForm from '../components/AuthForm.jsx';
import { useNavigate } from 'react-router-dom';
const AuthSystem = () => {
  const {
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
    resetForms,
    handleInputChange,
    handlePhoneChange,
    handleSubmit
  } = useAuthForm();
const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            {currentView === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {currentView === 'login' ? 'Sign in to your account' : 'Join us today'}
          </p>
        </motion.div>

        {/* User Type Selector */}
        <UserTypeSelector
          currentView={currentView}
          userType={userType}
          setUserType={setUserType}
          resetForms={resetForms}
        />

        {/* Auth Form */}
        <AuthForm
          currentView={currentView}
          userType={userType}
          loginForm={loginForm}
          signupForm={signupForm}
          fieldErrors={fieldErrors}
          message={message}
          messageType={messageType}
          loading={loading}
          handleInputChange={handleInputChange}
          handlePhoneChange={handlePhoneChange}
          handleSubmit={handleSubmit}
        />

        {/* Forgot Password - Only show for login */}
        {currentView === 'login' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center"
          >
            <button
              type="button"
              onClick={() => {
                navigate("/forget")
              }}
              className="text-sm text-purple-900 hover:text-purple-800 hover:underline transition-colors"
            >
              Forgot Password?
            </button>
          </motion.div>
        )}

        {/* Toggle Between Login/Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600">
            {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setCurrentView(currentView === 'login' ? 'signup' : 'login');
                resetForms();
              }}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              {currentView === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthSystem;