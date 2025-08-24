import React from 'react';
import { motion } from 'framer-motion';

const UserTypeSelector = ({ currentView, userType, setUserType, resetForms }) => {
  // Get user types based on current view
  const getUserTypes = () => {
    if (currentView === 'signup') {
      return ['user', 'superadmin'];
    }
    return ['user', 'admin', 'superadmin'];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex mb-6 bg-purple-100 rounded-lg p-1"
    >
      {getUserTypes().map((type) => (
        <button
          key={type}
          onClick={() => {
            setUserType(type);
            resetForms();
          }}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            userType === type
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-600 hover:bg-purple-200'
          }`}
        >
          {type === 'superadmin' ? 'Super Admin' : type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </motion.div>
  );
};

export default UserTypeSelector;