import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, RotateCcw } from 'lucide-react';
import PairingButtons from './PairingButtons';
import PairingDisplay from './PairingDisplay';

const PairingSection = ({ 
  botType = 'main', // 'main' or 'premium'
  phoneNumber = 'Loading...',
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
  const getBotLabel = () => {
    return botType === 'main' ? 'Main Bot' : 'Premium Bot';
  };

  const getBotIcon = () => {
    return botType === 'main' ? '🤖' : '👑';
  };

  const getBorderColor = () => {
    return botType === 'main' ? 'border-purple-200' : 'border-yellow-200';
  };

  const getHeaderColor = () => {
    return botType === 'main' ? 'text-purple-900' : 'text-yellow-900';
  };

  const getSubtextColor = () => {
    return botType === 'main' ? 'text-purple-600' : 'text-yellow-600';
  };

  const getPhoneColor = () => {
    return botType === 'main' ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: botType === 'main' ? 0.4 : 0.6 }}
      className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 ${getBorderColor()} shadow-lg`}
    >
      {/* Header with Phone Number */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`p-3 ${botType === 'main' ? 'bg-green-500' : 'bg-yellow-500'} rounded-xl w-fit`}
          >
            <Smartphone className="text-white" size={20} />
          </motion.div>
          <div className="flex-1">
            <h2 className={`text-lg sm:text-xl font-bold ${getHeaderColor()} flex items-center`}>
              {getBotIcon()} Pair your WhatsApp - {getBotLabel()}
            </h2>
            <p className={`${getSubtextColor()} text-xs sm:text-sm`}>
              Connect your device to the {getBotLabel().toLowerCase()}
            </p>
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

        {/* Phone Number Display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: botType === 'main' ? 0.5 : 0.7 }}
          className={`inline-block px-4 py-2 rounded-lg border text-sm font-medium ${getPhoneColor()}`}
        >
          📱 Pairing code for: <span className="font-bold">{phoneNumber}</span>
        </motion.div>
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