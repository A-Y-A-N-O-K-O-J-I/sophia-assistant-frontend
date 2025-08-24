import React from 'react';
import { motion } from 'framer-motion';

const AdminHeader = ({ adminInfo, error, setError }) => {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {adminInfo.name.split(' ')[0]}! Manage your users and admin codes.
        </p>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 flex items-center justify-between"
        >
          <span>{error}</span>
          <button
            onClick={() => setError('')}
            className="text-red-600 hover:text-red-800 font-bold text-xl"
          >
            ×
          </button>
        </motion.div>
      )}
    </>
  );
};

export default AdminHeader;