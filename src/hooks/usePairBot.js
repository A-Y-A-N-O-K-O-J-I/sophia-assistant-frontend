import { useState, useEffect } from 'react';

export const usePairBot = () => {
  // User info state
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    plan: "lite",
    isPremium: false
  });
  
  // Shared state
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyLoading, setApiKeyLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState('');
  
  // Phone numbers
  const [mainPhoneNumber, setMainPhoneNumber] = useState('');
  const [premiumPhoneNumber, setPremiumPhoneNumber] = useState('');
  
  // Main bot state
  const [mainBot, setMainBot] = useState({
    showPairing: false,
    timeRemaining: 120,
    loading: false,
    connectionStatus: 'disconnected',
    pairingMethod: 'code',
    pairingCode: '',
    qrCodeData: ''
  });
  
  // Premium bot state
  const [premiumBot, setPremiumBot] = useState({
    showPairing: false,
    timeRemaining: 120,
    loading: false,
    connectionStatus: 'disconnected',
    pairingMethod: 'code',
    pairingCode: '',
    qrCodeData: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Get the appropriate endpoint based on plan and bot type
  const getEndpoint = (action, botType) => {
    if (botType === 'assistant') {
      // Premium bot always uses premium endpoints
      switch (action) {
        case 'pair':
          return '/user/premium-pair';
        case 'qr':
          return '/user/premium-qr-code';
        case 'status':
          return '/user/premium-bot-status';
        case 'reset':
          return '/user/reset-premium-bot';
        default:
          return '';
      }
    } else {
      // Main bot - check plan
      switch (action) {
        case 'pair':
          return userInfo.plan === 'lite' ? '/user/lite-pair' : '/user/pair';
        case 'qr':
          return userInfo.plan === 'lite' ? '/user/lite-qr-code' : '/user/qr-code';
        case 'status':
          return '/user/bot-status';
        case 'reset':
          return '/user/reset-bot';
        default:
          return '';
      }
    }
  };

  // Check user premium status
  const checkPremiumStatus = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      const response = await fetch(`${API_URL}/user/dashboard`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) throw new Error('Failed to check premium status');

      const data = await response.json();
      setUserInfo(data.userInfo || userInfo);
    } catch (err) {
      console.error('Premium status check error:', err);
    }
  };

  // Get phone number for specific bot
  const getPhoneNumber = async (botType) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      // For lite plan, send 'assistant', otherwise use the botType as is
      let botParam = botType;
      if (botType === 'main' && userInfo.plan === 'lite') {
        botParam = 'assistant';
      }
      
      const response = await fetch(`${API_URL}/user/get-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ bot: botParam })
      });

      if (!response.ok) throw new Error(`Failed to get ${botType} phone number`);

      const data = await response.json();
      
      if (botType === 'main') {
        setMainPhoneNumber(data.phoneNumber || 'Not Set');
      } else {
        setPremiumPhoneNumber(data.phoneNumber || 'Not Set');
      }
    } catch (err) {
      console.error(`Phone number fetch error for ${botType}:`, err);
      if (botType === 'main') {
        setMainPhoneNumber('Error loading');
      } else {
        setPremiumPhoneNumber('Error loading');
      }
    }
  };

  // Check bot status function
  const checkBotStatus = async (botType) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      const endpoint = getEndpoint('status', botType);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) throw new Error(`Failed to check ${botType} bot status`);

      const data = await response.json();
      
      if (data.connected) {
        if (botType === 'main') {
          setMainBot(prev => ({ ...prev, connectionStatus: 'connected' }));
          setTimeout(() => {
            setMainBot(prev => ({ ...prev, showPairing: false }));
          }, 3000);
        } else {
          setPremiumBot(prev => ({ ...prev, connectionStatus: 'connected' }));
          setTimeout(() => {
            setPremiumBot(prev => ({ ...prev, showPairing: false }));
          }, 3000);
        }
      }
    } catch (err) {
      console.error(`${botType} status check error:`, err);
    }
  };

  // Fetch API key (shared for both bots)
  const fetchApiKey = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      setApiKeyLoading(true);
      const response = await fetch(`${API_URL}/user/api-key`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
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
  const generatePairingCode = async (botType) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      const setBotState = botType === 'main' ? setMainBot : setPremiumBot;
      
      setBotState(prev => ({ ...prev, loading: true }));
      setError(null);
      
      const endpoint = getEndpoint('pair', botType);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ bot: botType })
      });

      if (!response.ok) throw new Error(`Failed to generate ${botType} pairing code`);

      const data = await response.json();
      
      setBotState(prev => ({
        ...prev,
        pairingMethod: 'code',
        pairingCode: data.code,
        qrCodeData: '',
        showPairing: true,
        connectionStatus: 'waiting',
        timeRemaining: 120,
        loading: false
      }));
    } catch (err) {
      setError(`Failed to generate ${botType} pairing code. Please try again.`);
      console.error(`${botType} pairing error:`, err);
      const setBotState = botType === 'main' ? setMainBot : setPremiumBot;
      setBotState(prev => ({ ...prev, loading: false }));
    }
  };

  // Generate QR code
  const generateQRCode = async (botType) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      const setBotState = botType === 'main' ? setMainBot : setPremiumBot;
      
      setBotState(prev => ({ ...prev, loading: true }));
      setError(null);
      
      const endpoint = getEndpoint('qr', botType);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ bot: botType })
      });

      if (!response.ok) throw new Error(`Failed to generate ${botType} QR code`);

      const data = await response.json();
      
      setBotState(prev => ({
        ...prev,
        pairingMethod: 'qr',
        qrCodeData: data.qr,
        pairingCode: '',
        showPairing: true,
        connectionStatus: 'waiting',
        timeRemaining: 120,
        loading: false
      }));
    } catch (err) {
      setError(`Failed to generate ${botType} QR code. Please try again.`);
      console.error(`${botType} QR error:`, err);
      const setBotState = botType === 'main' ? setMainBot : setPremiumBot;
      setBotState(prev => ({ ...prev, loading: false }));
    }
  };

  // Reset connection
  const resetConnection = async (botType) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token');
      }

      const setBotState = botType === 'main' ? setMainBot : setPremiumBot;
      
      setBotState(prev => ({ ...prev, loading: true }));
      setError(null);
      
      const endpoint = getEndpoint('reset', botType);
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ bot: botType })
      });

      if (!response.ok) throw new Error(`Failed to reset ${botType} connection`);

      const data = await response.json();
      
      setBotState({
        showPairing: false,
        timeRemaining: 120,
        loading: false,
        connectionStatus: 'disconnected',
        pairingMethod: 'code',
        pairingCode: '',
        qrCodeData: ''
      });
      
      setError(data.message);
      setTimeout(() => setError(null), 3000);
    } catch (err) {
      setError(`Failed to reset ${botType} connection. Please try again.`);
      console.error(`${botType} reset error:`, err);
      const setBotState = botType === 'main' ? setMainBot : setPremiumBot;
      setBotState(prev => ({ ...prev, loading: false }));
    }
  };

  // Copy API key
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  // Main bot action handlers
  const mainBotActions = {
    generatePairingCode: () => generatePairingCode('main'),
    generateQRCode: () => generateQRCode('main'),
    resetConnection: () => resetConnection('main'),
    switchMethod: () => {
      if (mainBot.pairingMethod === 'code') {
        generateQRCode('main');
      } else {
        generatePairingCode('main');
      }
    },
    regenerate: () => {
      if (mainBot.pairingMethod === 'code') {
        generatePairingCode('main');
      } else {
        generateQRCode('main');
      }
    }
  };

  // Premium bot action handlers
  const premiumBotActions = {
    generatePairingCode: () => generatePairingCode('assistant'),
    generateQRCode: () => generateQRCode('assistant'),
    resetConnection: () => resetConnection('assistant'),
    switchMethod: () => {
      if (premiumBot.pairingMethod === 'code') {
        generateQRCode('assistant');
      } else {
        generatePairingCode('assistant');
      }
    },
    regenerate: () => {
      if (premiumBot.pairingMethod === 'code') {
        generatePairingCode('assistant');
      } else {
        generateQRCode('assistant');
      }
    }
  };

  // Effects
  useEffect(() => {
    fetchApiKey();
    checkPremiumStatus();
  }, []);

  // Get phone numbers when premium status is loaded
  useEffect(() => {
    if (userInfo.name) { // Only when user info is loaded
      getPhoneNumber('main');
      if (userInfo.isPremium) {
        getPhoneNumber('assistant');
      }
    }
  }, [userInfo.isPremium, userInfo.name]);

  // Timer for main bot pairing code/QR expiry
  useEffect(() => {
    let interval = null;
    if (mainBot.showPairing && mainBot.timeRemaining > 0) {
      interval = setInterval(() => {
        setMainBot(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
    } else if (mainBot.timeRemaining === 0) {
      setMainBot(prev => ({
        ...prev,
        showPairing: false,
        timeRemaining: 120,
        connectionStatus: 'disconnected',
        pairingCode: '',
        qrCodeData: ''
      }));
    }
    return () => clearInterval(interval);
  }, [mainBot.showPairing, mainBot.timeRemaining]);

  // Timer for premium bot pairing code/QR expiry
  useEffect(() => {
    let interval = null;
    if (premiumBot.showPairing && premiumBot.timeRemaining > 0) {
      interval = setInterval(() => {
        setPremiumBot(prev => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }));
      }, 1000);
    } else if (premiumBot.timeRemaining === 0) {
      setPremiumBot(prev => ({
        ...prev,
        showPairing: false,
        timeRemaining: 120,
        connectionStatus: 'disconnected',
        pairingCode: '',
        qrCodeData: ''
      }));
    }
    return () => clearInterval(interval);
  }, [premiumBot.showPairing, premiumBot.timeRemaining]);

  // Polling for main bot status
  useEffect(() => {
    let statusInterval = null;
    if (mainBot.connectionStatus === 'waiting') {
      statusInterval = setInterval(() => {
        checkBotStatus('main');
      }, 3000);
    }
    return () => clearInterval(statusInterval);
  }, [mainBot.connectionStatus]);

  // Polling for premium bot status
  useEffect(() => {
    let statusInterval = null;
    if (premiumBot.connectionStatus === 'waiting') {
      statusInterval = setInterval(() => {
        checkBotStatus('assistant');
      }, 3000);
    }
    return () => clearInterval(statusInterval);
  }, [premiumBot.connectionStatus]);

  return {
    // User info
    userInfo,
    
    // Shared state
    apiKeyCopied,
    showApiKey,
    apiKeyLoading,
    error,
    apiKey,
    
    // Phone numbers
    mainPhoneNumber,
    premiumPhoneNumber,
    
    // Bot states
    mainBot,
    premiumBot,
    
    // Shared actions
    setShowApiKey,
    setError,
    copyApiKey,
    
    // Bot-specific actions
    mainBotActions,
    premiumBotActions
  };
};