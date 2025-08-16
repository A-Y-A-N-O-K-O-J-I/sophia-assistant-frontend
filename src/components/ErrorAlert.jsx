import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { getErrorConfig } from '../utils/helpers';

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  const config = getErrorConfig(error);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="max-w-4xl mx-auto mb-6"
      >
        <div className={`border-2 rounded-lg p-4 flex items-center space-x-3 ${config.bgColor} ${config.borderColor}`}>
          {error.includes('success') || error.includes('reset') ? (
            <CheckCircle className={config.iconColor} size={20} />
          ) : (
            <AlertCircle className={config.iconColor} size={20} />
          )}
          <span className={`text-sm ${config.textColor}`}>
            {error}
          </span>
          <button
            onClick={onClose}
            className={`ml-auto hover:opacity-70 ${config.iconColor}`}
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorAlert;