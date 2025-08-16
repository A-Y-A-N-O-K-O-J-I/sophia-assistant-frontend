import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, QrCode, Loader2 } from 'lucide-react';

const PairingButtons = ({ 
  connectionStatus, 
  loading, 
  pairingMethod, 
  onGeneratePairingCode, 
  onGenerateQRCode 
}) => {
  return (
    <motion.div
      key="pair-buttons"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Connection Status */}
      {connectionStatus === 'connected' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center space-x-3 p-4 bg-green-100 text-green-700 rounded-lg border-2 border-green-300 w-fit mx-auto"
        >
          <CheckCircle size={20} />
          <span className="font-semibold">✅ WhatsApp Connected!</span>
        </motion.div>
      )}

      {/* Pairing Method Buttons */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Pairing Code Button */}
        <motion.button
          onClick={onGeneratePairingCode}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-xl font-bold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center space-y-3">
            {loading && pairingMethod === 'code' ? (
              <Loader2 className="animate-spin" size={32} />
            ) : (
              <Zap size={32} />
            )}
            <span className="text-lg">Pairing Code</span>
            <span className="text-sm opacity-90">Get a 6-digit code</span>
          </div>
        </motion.button>

        {/* QR Code Button */}
        <motion.button
          onClick={onGenerateQRCode}
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-xl font-bold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-col items-center space-y-3">
            {loading && pairingMethod === 'qr' ? (
              <Loader2 className="animate-spin" size={32} />
            ) : (
              <QrCode size={32} />
            )}
            <span className="text-lg">QR Code</span>
            <span className="text-sm opacity-90">Scan with camera</span>
          </div>
        </motion.button>
      </div>
      
      <p className="text-purple-600 text-xs sm:text-sm text-center px-4">
        Choose your preferred method to connect WhatsApp
      </p>
    </motion.div>
  );
};

export default PairingButtons;