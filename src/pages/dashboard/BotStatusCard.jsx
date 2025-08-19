import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';
import { getStatusIcon, getStatusColor, getStatusText } from '../../utils/DashboardUtils';

const BotStatusCard = ({ botStatus, onPairBot, label = "Bot Status" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`mb-8 p-8 rounded-2xl shadow-lg border-l-4 ${getStatusColor(botStatus)}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-white rounded-xl shadow-md">
            <Bot size={32} className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{label}</h2>
            <p className="text-gray-600">Monitor your bot connection</p>
          </div>
        </div>
        {getStatusIcon(botStatus)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-gray-600 mb-1">Connection Status</p>
          <p className="text-xl font-bold text-gray-800">{getStatusText(botStatus)}</p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-gray-600 mb-1">Bot Name</p>
          <p className="text-xl font-bold text-gray-800">
            {botStatus.botName || 'Not Named'}
          </p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-gray-600 mb-1">Last Connected</p>
          <p className="text-xl font-bold text-gray-800">
            {botStatus.lastConnected || 'Never'}
          </p>
        </div>
      </div>

      {!botStatus.isLinked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Ready to connect your bot?
              </h3>
              <p className="text-gray-600">
                Set up your bot connection to start automating your tasks.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPairBot}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
            >
              <span className="font-medium">Pair Bot</span>
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BotStatusCard;