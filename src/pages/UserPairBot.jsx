import React from 'react';
import { motion } from 'framer-motion';
import UserSidebar from '../components/UserNavbar';
import { usePairBot } from '../hooks/usePairBot';
import ErrorAlert from '../components/ErrorAlert';
import ApiKeySection from '../components/ApiKeySection';
import PairingSection from '../components/PairingSection';

const PairBotPage = () => {
  const {
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
  } = usePairBot();

  return (
    <>
      <UserSidebar />
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
            
            {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className={`mt-6 inline-block px-6 py-3 bg-gradient-to-r ${userInfo.plan === "premium" ? "from-yellow-500 to-yellow-600" : userInfo.plan ==="basic" ? "from-blue-500 to-green-400" : "from-gray-300 to-gray-500"} text-white rounded-full font-semibold shadow-lg`}
              >
               {userInfo.plan === "premium" ? "👑 Premium" : userInfo.plan ==="basic" ? "⚡ Basic" : "🌱 Lite"} Account - {userInfo.isPremium ? "Dual" : "Singular"} Bot Support
              </motion.div>
          </motion.div>

          {/* Error/Success Alert */}
          <ErrorAlert 
            error={error}
            onClose={() => setError(null)}
          />

          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* API Key Section */}
            <ApiKeySection
              apiKey={apiKey}
              apiKeyLoading={apiKeyLoading}
              showApiKey={showApiKey}
              apiKeyCopied={apiKeyCopied}
              onToggleVisibility={() => setShowApiKey(!showApiKey)}
              onCopyApiKey={copyApiKey}
            />

            {/* Main Bot Pairing Section - Always shows */}
            <PairingSection
              botType="main"
              phoneNumber={mainPhoneNumber}
              connectionStatus={mainBot.connectionStatus}
              showPairing={mainBot.showPairing}
              loading={mainBot.loading}
              pairingMethod={mainBot.pairingMethod}
              pairingCode={mainBot.pairingCode}
              qrCodeData={mainBot.qrCodeData}
              timeRemaining={mainBot.timeRemaining}
              onResetConnection={mainBotActions.resetConnection}
              onGeneratePairingCode={mainBotActions.generatePairingCode}
              onGenerateQRCode={mainBotActions.generateQRCode}
              onSwitchMethod={mainBotActions.switchMethod}
              onRegenerate={mainBotActions.regenerate}
            />

            {/* Premium Bot Pairing Section - Only shows for premium users */}
            {userInfo.isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <PairingSection
                  botType="premium"
                  phoneNumber={premiumPhoneNumber}
                  connectionStatus={premiumBot.connectionStatus}
                  showPairing={premiumBot.showPairing}
                  loading={premiumBot.loading}
                  pairingMethod={premiumBot.pairingMethod}
                  pairingCode={premiumBot.pairingCode}
                  qrCodeData={premiumBot.qrCodeData}
                  timeRemaining={premiumBot.timeRemaining}
                  onResetConnection={premiumBotActions.resetConnection}
                  onGeneratePairingCode={premiumBotActions.generatePairingCode}
                  onGenerateQRCode={premiumBotActions.generateQRCode}
                  onSwitchMethod={premiumBotActions.switchMethod}
                  onRegenerate={premiumBotActions.regenerate}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PairBotPage;