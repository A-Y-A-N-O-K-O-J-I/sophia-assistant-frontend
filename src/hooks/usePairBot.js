import { useState, useEffect } from 'react';

export const usePairBot = () => {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [showPairing, setShowPairing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [showApiKey, setShowApiKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [error, setError] = useState(null);
  const [pairingMethod, setPairingMethod] = useState('code');
  
  // API data
  const [apiKey, setApiKey] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Check bot status function
  const checkBotStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/user/bot-status`, {
        method: "POST",
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to check bot status');

      const data = await response.json();
      
      if (data.connected) {
        setConnectionStatus('connected');
        setTimeout(() => {
          setShowPairing(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Status check error:', err);
    }
  };

  // Fetch API key
  const fetchApiKey = async () => {
    try {
      setApiKeyLoading(true);
      const response = await fetch(`${API_URL}/user/api-key`, {
        method: 'POST',
        credentials: "include"
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

  // Generate pairing code
  const generatePairingCode = async () => {
    try {
      setLoading(true);
      setError(null);
      setPairingMethod('code');
      
      const response = await fetch(`${API_URL}/user/pair`, {
        method: 'POST',
        credentials: "include"
      });

      if (!response.ok) throw new Error('Failed to generate pairing code');

      const data = await response.json();
      setPairingCode(data.code);
      setQrCodeData('');
      setShowPairing(true);
      setConnectionStatus('waiting');
      setTimeRemaining(120);
    } catch (err) {
      setError('Failed to generate pairing code. Please try again.');
      console.error('Pairing error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate QR code
  const generateQRCode = async () => {
    try {
      setLoading(true);
      setError(null);
      setPairingMethod('qr');
      
      const response = await fetch(`${API_URL}/user/qr-code`, {
        method: 'POST',
        credentials: "include"
      });

      if (!response.ok) throw new Error('Failed to generate QR code');

      const data = await response.json();
      setQrCodeData(data.qr);
      setPairingCode('');
      setShowPairing(true);
      setConnectionStatus('waiting');
      setTimeRemaining(120);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error('QR error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset connection
  const resetConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/user/reset-bot`, {
        method: 'POST',
        credentials: "include"
      });

      if (!response.ok) throw new Error('Failed to reset connection');

      const data = await response.json();
      setConnectionStatus('disconnected');
      setShowPairing(false);
      setPairingCode('');
      setQrCodeData('');
      setTimeRemaining(120);
      setError(null);
      
      setError(data.message);
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError('Failed to reset connection. Please try again.');
      console.error('Reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Copy API key
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  // Effects
  useEffect(() => {
    fetchApiKey();
  }, []);

  // Timer for pairing code/QR expiry
  useEffect(() => {
    let interval = null;
    if (showPairing && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setShowPairing(false);
      setTimeRemaining(120);
      setConnectionStatus('disconnected');
      setPairingCode('');
      setQrCodeData('');
    }
    return () => clearInterval(interval);
  }, [showPairing, timeRemaining]);

  // Polling for bot status
  useEffect(() => {
    let statusInterval = null;
    if (connectionStatus === 'waiting') {
      statusInterval = setInterval(() => {
        checkBotStatus();
      }, 3000);
    }
    return () => clearInterval(statusInterval);
  }, [connectionStatus, API_URL]);

  return {
    // State
    apiKeyCopied,
    showPairing,
    timeRemaining,
    showApiKey,
    loading,
    apiKeyLoading,
    connectionStatus,
    error,
    pairingMethod,
    apiKey,
    pairingCode,
    qrCodeData,
    
    // Actions
    setShowApiKey,
    setError,
    generatePairingCode,
    generateQRCode,
    resetConnection,
    copyApiKey
  };
};