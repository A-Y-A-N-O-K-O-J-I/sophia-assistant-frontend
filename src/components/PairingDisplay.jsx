import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Wifi, Clock, QrCode, Zap, RotateCcw } from 'lucide-react';
import { getStatusConfig, getTimerConfig, formatTime } from '../utils/helpers';

const ConnectionStatus = ({ connectionStatus }) => {
  const config = getStatusConfig(connectionStatus);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center space-x-3 p-3 rounded-lg mx-auto w-fit ${config.bgColor} ${config.textColor} border-2 ${config.borderColor}`}
    >
      {connectionStatus === 'connected' ? (
        <>
          <CheckCircle size={16} />
          <span className="font-semibold text-sm">✅ Connected successfully!</span>
        </>
      ) : connectionStatus === 'waiting' ? (
        <>
          <Loader2 className="animate-spin" size={16} />
          <span className="font-semibold text-sm">Waiting for connection...</span>
        </>
      ) : (
        <>
          <Wifi size={16} />
          <span className="font-semibold text-sm">Ready to pair</span>
        </>
      )}
    </motion.div>
  );
};

const PairingCodeDisplay = ({ pairingCode, connectionStatus }) => (
  <div className="space-y-4">
    <div className="bg-purple-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-300">
      <p className="text-purple-200 text-xs sm:text-sm mb-2">Pairing Code:</p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 10,
          delay: 0.2 
        }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider text-center"
        style={{
          textShadow: `2px 2px 4px rgba(0, 0, 0, 0.3)`
        }}
      >
        {pairingCode}
      </motion.div>
    </div>

    {connectionStatus !== 'connected' && (
      <div className="text-left bg-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-purple-800 text-xs sm:text-sm space-y-2 border border-purple-200">
        <p className="font-semibold text-purple-900 mb-3 text-sm sm:text-base">Instructions:</p>
        <div className="space-y-1 sm:space-y-2">
          <p>1. Open WhatsApp on your phone</p>
          <p>2. Go to Settings → Linked Devices</p>
          <p>3. Tap "Link a Device"</p>
          <p>4. Enter the code above when prompted</p>
        </div>
      </div>
    )}
  </div>
);

const QRCodeDisplay = ({ qrCodeData, connectionStatus }) => (
  <div className="space-y-4">
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6 shadow-lg">
      <p className="text-gray-700 text-sm mb-4 text-center font-semibold">Scan QR Code:</p>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.2 
        }}
        className="flex justify-center"
      >
        <img 
          src={qrCodeData} 
          alt="WhatsApp QR Code" 
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-4 border-gray-200 rounded-lg shadow-md"
        />
      </motion.div>
    </div>

    {connectionStatus !== 'connected' && (
      <div className="text-left bg-green-50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-green-800 text-xs sm:text-sm space-y-2 border border-green-200">
        <p className="font-semibold text-green-900 mb-3 text-sm sm:text-base">Instructions:</p>
        <div className="space-y-1 sm:space-y-2">
          <p>1. Open WhatsApp on your phone</p>
          <p>2. Go to Settings → Linked Devices</p>
          <p>3. Tap "Link a Device"</p>
          <p>4. Point your camera at the QR code above</p>
        </div>
      </div>
    )}
  </div>
);

const Timer = ({ timeRemaining, connectionStatus }) => {
  const config = getTimerConfig(timeRemaining);
  
  if (connectionStatus === 'connected') return null;

  return (
    <motion.div
      animate={{ 
        scale: timeRemaining <= 30 ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 0.5,
        repeat: timeRemaining <= 30 ? Infinity : 0,
      }}
      className={`flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg mx-auto w-fit ${config.bgColor} ${config.textColor} border-2 ${config.borderColor}`}
    >
      <Clock size={16} />
      <span className="font-mono text-sm sm:text-base font-semibold">
        Expires in: {formatTime(timeRemaining)}
      </span>
    </motion.div>
  );
};

const ActionButtons = ({ 
  pairingMethod, 
  loading, 
  connectionStatus, 
  onSwitchMethod, 
  onRegenerate 
}) => {
  if (connectionStatus === 'connected') return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSwitchMethod}
        disabled={loading}
        className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 border-2 border-blue-300 text-sm sm:text-base disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : pairingMethod === 'code' ? (
          <QrCode size={16} />
        ) : (
          <Zap size={16} />
        )}
        <span>
          Switch to {pairingMethod === 'code' ? 'QR Code' : 'Pairing Code'}
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRegenerate}
        disabled={loading}
        className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 border-2 border-purple-300 text-sm sm:text-base disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <RotateCcw size={16} />
        )}
        <span>
          Regenerate {pairingMethod === 'code' ? 'Code' : 'QR'}
        </span>
      </motion.button>
    </div>
  );
};

const PairingDisplay = ({ 
  pairingMethod, 
  pairingCode, 
  qrCodeData, 
  connectionStatus, 
  timeRemaining, 
  loading,
  onSwitchMethod,
  onRegenerate
}) => {
  return (
    <motion.div
      key="pairing-display"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="space-y-6"
    >
      <ConnectionStatus connectionStatus={connectionStatus} />

      {/* Pairing Code or QR Display */}
      {pairingMethod === 'code' && pairingCode ? (
        <PairingCodeDisplay pairingCode={pairingCode} connectionStatus={connectionStatus} />
      ) : pairingMethod === 'qr' && qrCodeData ? (
        <QRCodeDisplay qrCodeData={qrCodeData} connectionStatus={connectionStatus} />
      ) : null}

      <Timer timeRemaining={timeRemaining} connectionStatus={connectionStatus} />

      <ActionButtons 
        pairingMethod={pairingMethod}
        loading={loading}
        connectionStatus={connectionStatus}
        onSwitchMethod={onSwitchMethod}
        onRegenerate={onRegenerate}
      />
    </motion.div>
  );
};

export default PairingDisplay;