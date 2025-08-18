import { motion } from 'framer-motion';
import UserSidebar from '../components/UserNavbar';
import { usePairBot } from '../hooks/usePairBot';
import ErrorAlert from '../components/ErrorAlert';
import ApiKeySection from '../components/ApiKeySection';
import PairingSection from '../components/PairingSection';
import SuccessResetSection from '../components/ResetSection';

const PairBotPage = () => {

  const {
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
  } = usePairBot();

  // Handler functions for pairing actions
  const handleSwitchMethod = () => {
    if (pairingMethod === 'code') {
      generateQRCode();
    } else {
      generatePairingCode();
    }
  };

  const handleRegenerate = () => {
    if (pairingMethod === 'code') {
      generatePairingCode();
    } else {
      generateQRCode();
    }
  };

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

            {/* Pairing Section */}
            
           { <PairingSection
              connectionStatus={connectionStatus}
              showPairing={showPairing}
              loading={loading}
              pairingMethod={pairingMethod}
              pairingCode={pairingCode}
              qrCodeData={qrCodeData}
              timeRemaining={timeRemaining}
              onResetConnection={resetConnection}
              onGeneratePairingCode={generatePairingCode}
              onGenerateQRCode={generateQRCode}
              onSwitchMethod={handleSwitchMethod}
              onRegenerate={handleRegenerate}
            /> }
          </div>
        </div>
      </div>
    </>
  );
};

export default PairBotPage;