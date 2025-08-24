import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormField from './FormField.jsx';
import MessageDisplay from './MessageDisplay.jsx';

const AuthForm = ({
  currentView,
  userType,
  loginForm,
  signupForm,
  fieldErrors,
  message,
  messageType,
  loading,
  handleInputChange,
  handlePhoneChange,
  handleSubmit
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.form
        key={currentView}
        initial={{ opacity: 0, x: currentView === 'login' ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: currentView === 'login' ? 20 : -20 }}
        transition={{ duration: 0.3 }}
        onSubmit={(e) => handleSubmit(e, currentView === 'signup')}
        className="space-y-4"
      >
        {/* Signup Fields */}
        {currentView === 'signup' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              type="text"
              placeholder="Full Name"
              value={signupForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={fieldErrors.name}
            />
          </motion.div>
        )}

        {/* Email Field */}
        <FormField
          type="email"
          placeholder="Email Address"
          value={currentView === 'login' ? loginForm.email : signupForm.email}
          onChange={(e) => handleInputChange('email', e.target.value, currentView === 'login')}
          error={fieldErrors.email}
        />

        {/* Password Field */}
        <FormField
          type="password"
          placeholder="Password"
          value={currentView === 'login' ? loginForm.password : signupForm.password}
          onChange={(e) => handleInputChange('password', e.target.value, currentView === 'login')}
          error={fieldErrors.password}
        />

        {/* Conditional Fields for Signup */}
        {currentView === 'signup' && (
          <AnimatePresence>
            {userType === 'superadmin' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <FormField
                  type="password"
                  placeholder="Admin Key"
                  value={signupForm.adminkey}
                  onChange={(e) => handleInputChange('adminkey', e.target.value)}
                  error={fieldErrors.adminkey}
                />
              </motion.div>
            )}

            {userType === 'user' && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FormField
                    type="text"
                    placeholder="Admin Code"
                    value={signupForm.adminCode}
                    onChange={(e) => handleInputChange('adminCode', e.target.value)}
                    error={fieldErrors.adminCode}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FormField
                    type="tel"
                    placeholder="Main Phone (+1234567890)"
                    value={signupForm.mainPhone}
                    onChange={(e) => handlePhoneChange('mainPhone', e.target.value)}
                    error={fieldErrors.mainPhone}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <FormField
                    type="tel"
                    placeholder="Assistant Phone (+1234567890)"
                    value={signupForm.assistantPhone}
                    onChange={(e) => handlePhoneChange('assistantPhone', e.target.value)}
                    error={fieldErrors.assistantPhone}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Message Display */}
        <MessageDisplay message={message} messageType={messageType} />

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            currentView === 'login' ? 'Sign In' : 'Create Account'
          )}
        </motion.button>
      </motion.form>
    </AnimatePresence>
  );
};

export default AuthForm;