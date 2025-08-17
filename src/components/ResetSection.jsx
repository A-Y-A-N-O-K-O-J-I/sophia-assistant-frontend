import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RotateCcw, Smartphone } from 'lucide-react';

const SuccessResetSection = ({ onReset, loading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-200 shadow-lg"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-green-500 rounded-xl w-fit"
        >
          <Smartphone className="text-white" size={20} />
        </motion.div>
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-green-900 flex items-center">
            🤝 WhatsApp Bot Status
          </h2>
          <p className="text-green-600 text-xs sm:text-sm">Your bot connection status</p>
        </div>
      </div>

      {/* Success Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center py-8"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-green-800 mb-3">
            🎉 Bot Paired Successfully!
          </h3>
          <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">
            The bot has paired successfully with your WhatsApp account. 
            If it failed or something occurred, please tap on Reset to try again.
          </p>
        </motion.div>

        {/* Status Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 max-w-md mx-auto"
        >
          <div className="flex items-center justify-center space-x-2 text-green-700">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Connection Active</span>
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          disabled={loading}
          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <RotateCcw size={20} className={loading ? "animate-spin" : ""} />
          <span>{loading ? 'Resetting...' : 'Reset Connection'}</span>
        </motion.button>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-sm text-gray-500 mt-6"
        >
          This will disconnect your bot and allow you to pair again
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessResetSection;