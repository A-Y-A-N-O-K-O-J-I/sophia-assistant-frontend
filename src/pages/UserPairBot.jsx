import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy,
  Check,
  Key,
  Smartphone,
  Clock,
  Zap,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  Wifi
} from 'lucide-react';
import UserSidebar from '../components/UserNavbar';

const PairBotPage = () => {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [showPairingCode, setShowPairingCode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('disconnected'); // disconnected, waiting, connected
  const [error, setError] = useState(null);
  
  // API data
  const [apiKey, setApiKey] = useState('');
  const [pairingCode, setPairingCode] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch API key on component mount
  useEffect(() => {
    fetchApiKey();
  }, []);

  // Timer for pairing code expiry
  useEffect(() => {
    let interval = null;
    if (showPairingCode && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setShowPairingCode(false);
      setTimeRemaining(120);
      setConnectionStatus('disconnected');
    }
    return () => clearInterval(interval);
  }, [showPairingCode, timeRemaining]);

  // Polling for bot status when waiting for connection
  useEffect(() => {
    let statusInterval = null;
    if (connectionStatus === 'waiting') {
      statusInterval = setInterval(() => {
        checkBotStatus();
      }, 3000);
    }
    return () => clearInterval(statusInterval);
  }, [connectionStatus]);

  const fetchApiKey = async () => {
    try {
      setApiKeyLoading(true);
      const response = await fetch(`${API_URL}/user/api-key`, {
        method: 'POST',
       credentials:"include"
      });
      
      if (!response.ok) throw new Error('Failed to fetch API key');
      
      const data = await response.json();
      setApiKey(data.apiKey);
    } catch (err) {
      setError('Failed to load API key');
      console.error('API Key fetch error:', err);
    } finally {
      setApiKeyLoading(false);
    }
  };

  const generatePairingCode = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/user/pair`, {
        method: 'POST',
        credentials:"include"
      });

      if (!response.ok) throw new Error('Failed to generate pairing code');

      const data = await response.json();
      setPairingCode(data.code);
      setShowPairingCode(true);
      setConnectionStatus('waiting');
      setTimeRemaining(120);
    } catch (err) {
      setError('Failed to generate pairing code. Please try again.');
      console.error('Pairing error:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkBotStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/user/bot-status`, {
      method:"POST",
      credentials:'include'
      });

      if (!response.ok) throw new Error('Failed to check bot status');

      const data = await response.json();
      
      if (data.connected) {
        setConnectionStatus('connected');
        // Optional: Hide pairing code after successful connection
        setTimeout(() => {
          setShowPairingCode(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Status check error:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    const start = key.substring(0, 6);
    const end = key.substring(key.length - 4);
    const middle = '•'.repeat(Math.min(20, key.length - 10));
    return start + middle + end;
  };

  return (
    <>
    <UserSidebar/>
    <div className="min-h-screen bg-white lg:pl-20 overflow-x-hidden">
      <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-3 sm:mb-4">
            WhatsApp Bot Setup
          </h1>
          <p className="text-purple-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Connect your WhatsApp account to start automating conversations
          </p>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto mb-6"
            >
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="text-red-600" size={20} />
                <span className="text-red-800 text-sm">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* API Key Section */}
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
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-2 sm:p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
                        >
                          {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyApiKey}
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

          {/* Pairing Section */}
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
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-purple-900 flex items-center">
                  🤝 Pair your WhatsApp
                </h2>
                <p className="text-purple-600 text-xs sm:text-sm">Connect your device to the bot</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showPairingCode ? (
                <motion.div
                  key="pair-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={generatePairingCode}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.05 }}
                    whileTap={{ scale: loading ? 1 : 0.95 }}
                    animate={{ 
                      y: loading ? 0 : [0, -8, 0],
                      boxShadow: loading ? "0 4px 12px rgba(147, 51, 234, 0.2)" : [
                        "0 8px 20px rgba(147, 51, 234, 0.3)",
                        "0 12px 30px rgba(147, 51, 234, 0.4)",
                        "0 8px 20px rgba(147, 51, 234, 0.3)"
                      ]
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: loading ? 0 : Infinity,
                        ease: "easeInOut"
                      },
                      boxShadow: {
                        duration: 2,
                        repeat: loading ? 0 : Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-lg transition-all duration-300 flex items-center space-x-2 sm:space-x-3 mx-auto ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                    <span>{loading ? 'Generating...' : 'Pair Now'}</span>
                  </motion.button>
                  
                  <p className="text-purple-600 text-xs sm:text-sm mt-4 px-4">
                    Click to generate a pairing code for your WhatsApp
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="pairing-code"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center space-y-4 sm:space-y-6"
                >
                  {/* Connection Status */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-center space-x-3 p-3 rounded-lg mx-auto w-fit ${
                      connectionStatus === 'connected' 
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : connectionStatus === 'waiting'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                    }`}
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

                  {/* Pairing Code Display */}
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
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider"
                      style={{
                        textShadow: `2px 2px 4px rgba(0, 0, 0, 0.3)`
                      }}
                    >
                      {pairingCode}
                    </motion.div>
                  </div>

                  {/* Timer */}
                  {connectionStatus !== 'connected' && (
                    <motion.div
                      animate={{ 
                        scale: timeRemaining <= 30 ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: timeRemaining <= 30 ? Infinity : 0,
                      }}
                      className={`flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg mx-auto w-fit ${
                        timeRemaining <= 30 
                          ? 'bg-red-100 text-red-700 border-2 border-red-300' 
                          : 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      }`}
                    >
                      <Clock size={16} />
                      <span className="font-mono text-sm sm:text-base font-semibold">
                        Expires in: {formatTime(timeRemaining)}
                      </span>
                    </motion.div>
                  )}

                  {/* Instructions */}
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

                  {/* Generate New Code Button */}
                  {connectionStatus !== 'connected' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generatePairingCode}
                      disabled={loading}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 border-2 border-purple-300 text-sm sm:text-base disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center space-x-2">
                          <Loader2 className="animate-spin" size={16} />
                          <span>Generating...</span>
                        </span>
                      ) : (
                        'Generate New Code'
                      )}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PairBotPage;