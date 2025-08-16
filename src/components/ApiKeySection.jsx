import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Eye, EyeOff, Copy, Check, Loader2 } from 'lucide-react';
import { maskApiKey } from '../utils/helpers';

const ApiKeySection = ({ 
  apiKey, 
  apiKeyLoading, 
  showApiKey, 
  apiKeyCopied, 
  onToggleVisibility, 
  onCopyApiKey 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="p-3 bg-purple-600 rounded-xl w-fit"
        >
          <Key className="text-white" size={20} />
        </motion.div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-purple-900 flex items-center">
            🔑 Your API Key
          </h2>
          <p className="text-purple-600 text-xs sm:text-sm">(keep this safe!)</p>
        </div>
      </div>

      <div className="space-y-4">
        {apiKeyLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-purple-600" size={24} />
            <span className="ml-2 text-purple-600">Loading API key...</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-purple-900 border-2 border-purple-200 break-all">
              {apiKey ? (showApiKey ? apiKey : maskApiKey(apiKey)) : 'No API key available'}
            </div>
            
            <div className="flex space-x-2 sm:space-x-3">
              {apiKey && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggleVisibility}
                    className="p-2 sm:p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
                  >
                    {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCopyApiKey}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm"
                  >
                    <AnimatePresence mode="wait">
                      {apiKeyCopied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center space-x-1 sm:space-x-2"
                        >
                          <Check size={14} />
                          <span className="hidden sm:inline">Copied!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center space-x-1 sm:space-x-2"
                        >
                          <Copy size={14} />
                          <span>Copy</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ApiKeySection;