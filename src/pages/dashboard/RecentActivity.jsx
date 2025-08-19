import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bot } from 'lucide-react';
import { getCurrentTime } from '../../utils/DashboardUtils';

const RecentActivity = ({ botStatus, onPairBot, label = "Recent Activity" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Calendar className="mr-2 text-purple-600" size={24} />
          {label}
        </h2>
        <span className="text-sm text-gray-500">{getCurrentTime()}</span>
      </div>

      {botStatus.isLinked ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Bot connected successfully</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Configuration updated</p>
              <p className="text-sm text-gray-600">1 day ago</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg font-medium mb-2">No Activity Yet</p>
          <p className="text-gray-400 text-sm mb-6">
            Connect your bot to start seeing activity logs here.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPairBot}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
          >
            <Bot size={18} />
            <span className="font-medium">Get Started</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivity;