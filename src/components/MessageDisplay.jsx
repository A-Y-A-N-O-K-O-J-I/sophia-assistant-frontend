import React from 'react';
import { motion } from 'framer-motion';

const MessageDisplay = ({ message, messageType }) => {
  if (!message) return null;

  const isError = messageType === 'error';
  const isSuccess = messageType === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`text-sm mt-2 p-3 border rounded-lg ${
        isError 
          ? 'text-red-500 bg-red-50 border-red-200'
          : isSuccess
          ? 'text-green-800 bg-green-50 border-green-200'
          : 'text-gray-800 bg-gray-50 border-gray-200'
      }`}
    >
      {message}
    </motion.div>
  );
};

export default MessageDisplay;