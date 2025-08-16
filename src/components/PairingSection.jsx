import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCcw } from 'lucide-react';
import PairingButtons from './PairingButtons';
import PairingDisplay from './PairingDisplay';

const PairingSection = ({ 
  connectionStatus,
  showPairing,
  loading,
  pairingMethod,
  pairingCode,
  qrCodeData,
  timeRemaining,
  onResetConnection,
  onGeneratePairingCode,
  onGenerateQRCode,
  onSwitchMethod,
  onRegenerate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-200 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-green-500 rounded-xl w-fit"
        >
          <Smartphone className="text-white" size={20} />
        </motion.div>
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-purple-900 flex items-center">
            🤝 Pair your WhatsApp
          </h2>
          <p className="text-purple-600 text-xs sm:text-sm">Connect your device to the bot</p>
        </div>
        
        {/* Reset Button */}
        {(connectionStatus === 'connected' || showPairing) && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResetConnection}
            disabled={loading}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg border-2 border-red-300 font-medium transition-all duration-300 flex items-center space-x-2 text-sm disabled:opacity-50"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showPairing ? (
          <PairingButtons
            connectionStatus={connectionStatus}
            loading={loading}
            pairingMethod={pairingMethod}
            onGeneratePairingCode={onGeneratePairingCode}
            onGenerateQRCode={onGenerateQRCode}
          />
        ) : (
          <PairingDisplay
            pairingMethod={pairingMethod}
            pairingCode={pairingCode}
            qrCodeData={qrCodeData}
            connectionStatus={connectionStatus}
            timeRemaining={timeRemaining}
            loading={loading}
            onSwitchMethod={onSwitchMethod}
            onRegenerate={onRegenerate}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PairingSection;