import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, Zap, ArrowRight, Clock } from 'lucide-react';

const QuickActionsGrid = ({ onPairBot }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, y: -2 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {/* Pair Bot Card */}
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:border-purple-200 transition-all cursor-pointer"
        onClick={onPairBot}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
            <Bot className="text-white" size={24} />
          </div>
          <ArrowRight className="text-purple-600" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Pair Bot</h3>
        <p className="text-gray-600 text-sm">
          Connect and configure your automation bot
        </p>
      </motion.div>

      {/* Account Status Card */}
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-green-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
            <CheckCircle className="text-white" size={24} />
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
            Verified
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Status</h3>
        <p className="text-gray-600 text-sm">
          Your account is verified and active
        </p>
      </motion.div>

      {/* Activity Card */}
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-blue-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
            <Zap className="text-white" size={24} />
          </div>
          <Clock className="text-blue-600" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Activity</h3>
        <p className="text-gray-600 text-sm">
          Monitor your bot's performance and logs
        </p>
      </motion.div>
    </div>
  );
};

export default QuickActionsGrid;