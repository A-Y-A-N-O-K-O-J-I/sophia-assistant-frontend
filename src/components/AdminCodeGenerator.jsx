import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key,
  Copy,
  CheckCircle,
  Plus,
  RefreshCw,
  Crown,
  Zap,
  Star
} from 'lucide-react';

const AdminCodeGenerator = () => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('lite');
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  const planOptions = [
    {
      value: 'lite',
      label: 'Lite Plan',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      description: 'Basic features'
    },
    {
      value: 'basic',
      label: 'Basic Plan',
      icon: Star,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      description: 'Enhanced features'
    },
    {
      value: 'premium',
      label: 'Premium Plan',
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      description: 'All features included'
    }
  ];

  // Generate admin code
  const handleGenerateCode = async () => {
    if (!selectedPlan) {
      setError('Please select a plan first');
      return;
    }

    try {
      setGenerating(true);
      setError('');
      const accessToken = localStorage.getItem("accessToken");
      if(!accessToken){
        setError('Access Token Not found')
        return;
      }
      const response = await fetch(`${API_URL}/admin/generate-admin-code`, {
        method: 'POST',
        headers: {
          'authorization' : `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ plan: selectedPlan })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedCode(data.code);
        setCopied(false);
      } else {
        setError('Failed to generate admin code');
      }
    } catch (err) {
      setError('Network error occurred while generating code');
      console.error('Code generation error:', err);
    } finally {
      setGenerating(false);
    }
  };

  // Copy admin code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Key className="mr-2 text-purple-600" size={24} />
          Admin Code Generator
        </h2>
      </div>

      <div className="space-y-6">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Plan Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 gap-3">
            {planOptions.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <motion.label
                  key={plan.value}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPlan === plan.value
                      ? `${plan.borderColor} ${plan.bgColor}`
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.value}
                    checked={selectedPlan === plan.value}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    selectedPlan === plan.value ? plan.bgColor : 'bg-gray-100'
                  }`}>
                    <IconComponent size={20} className={
                      selectedPlan === plan.value ? plan.color : 'text-gray-400'
                    } />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className={`font-semibold ${
                      selectedPlan === plan.value ? plan.color : 'text-gray-700'
                    }`}>
                      {plan.label}
                    </div>
                    <div className="text-sm text-gray-500">{plan.description}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.value 
                      ? `${plan.borderColor} ${plan.bgColor}` 
                      : 'border-gray-300'
                  }`}>
                    {selectedPlan === plan.value && (
                      <div className={`w-2 h-2 rounded-full ${
                        plan.value === 'lite' ? 'bg-blue-600' :
                        plan.value === 'basic' ? 'bg-green-600' : 'bg-purple-600'
                      }`} />
                    )}
                  </div>
                </motion.label>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Generate Button */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Generate secure admin codes for new user registrations
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerateCode}
            disabled={generating || !selectedPlan}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {generating ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Plus size={18} />
            )}
            <span className="font-medium">
              {generating ? 'Generating...' : `Generate ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Code`}
            </span>
          </motion.button>
        </div>

        {/* Generated Code Display */}
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-purple-25 p-6 rounded-xl border border-purple-200"
          >
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Generated {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Admin Code
              </p>
              <div className="bg-white p-4 rounded-lg border border-purple-200 font-mono text-lg font-bold text-purple-800 tracking-wider">
                {generatedCode}
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyCode}
              className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle size={18} />
                  <span className="font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span className="font-medium">Copy Code</span>
                </>
              )}
            </motion.button>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Share this code with users to allow them to register with {selectedPlan} plan
            </p>
          </motion.div>
        )}

        {/* Empty State */}
        {!generatedCode && (
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <Key size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 font-medium mb-2">No Code Generated</p>
            <p className="text-gray-400 text-sm">
              Select a plan and click the button above to generate a new admin code
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminCodeGenerator;