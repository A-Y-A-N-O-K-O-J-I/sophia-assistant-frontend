import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Wifi,
  WifiOff,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';
import UserSidebar from '../components/UserNavbar';

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe', // This would come from auth/context
    email: 'john@example.com'
  });
  const [botStatus, setBotStatus] = useState({
    isLinked: false,
    status: 'connecting', // 'active', 'inactive', 'connecting'
    lastConnected: null,
    botName: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch user dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/user/dashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials:"include"

        });

        if (response.ok) {
          const data = await response.json();
          setBotStatus(data.botStatus || botStatus);
          setUserInfo(data.userInfo || userInfo);
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Network error occurred');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_URL]);

  const handlePairBot = () => {
    // Navigate to pair bot page
    window.history.pushState({}, '', '/pair-bot');
    // In real app: navigate('/pair-bot');
  };

  const getStatusIcon = () => {
    if (botStatus.status === 'active') {
      return <CheckCircle className="text-green-500" size={24} />;
    } else if (botStatus.status === 'connecting') {
      return <Wifi className="text-yellow-500 animate-pulse" size={24} />;
    } else {
      return <XCircle className="text-red-500" size={24} />;
    }
  };

  const getStatusColor = () => {
    if (botStatus.status === 'active') return 'border-green-500 bg-green-50';
    if (botStatus.status === 'connecting') return 'border-yellow-500 bg-yellow-50';
    return 'border-red-500 bg-red-50';
  };

  const getStatusText = () => {
    if (botStatus.status === 'active') return 'Bot Active & Connected';
    if (botStatus.status === 'connecting') return 'Bot Connecting...';
    return botStatus.isLinked ? 'Bot Linked but Inactive' : 'No Bot Linked';
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  if (loading) {
    return (
      <div className="lg:ml-20 min-h-screen bg-gray-50">
        <div className="p-4 lg:p-8">
          <div className="flex items-center justify-center h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <UserSidebar />
    <div className="lg:ml-20 min-h-screen bg-gray-50">
      <div className="p-4 lg:p-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {userInfo.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your bot status and quick actions for today.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800"
          >
            {error}
          </motion.div>
        )}

        {/* Bot Status - Main Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-8 p-8 rounded-2xl shadow-lg border-l-4 ${getStatusColor()}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white rounded-xl shadow-md">
                <Bot size={32} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Bot Status</h2>
                <p className="text-gray-600">Monitor your bot connection</p>
              </div>
            </div>
            {getStatusIcon()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-600 mb-1">Connection Status</p>
              <p className="text-xl font-bold text-gray-800">{getStatusText()}</p>
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-600 mb-1">Bot Name</p>
              <p className="text-xl font-bold text-gray-800">
                {botStatus.botName || 'Not Named'}
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-gray-600 mb-1">Last Connected</p>
              <p className="text-xl font-bold text-gray-800">
                {botStatus.lastConnected || 'Never'}
              </p>
            </div>
          </div>

          {!botStatus.isLinked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl border border-purple-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ready to connect your bot?
                  </h3>
                  <p className="text-gray-600">
                    Set up your bot connection to start automating your tasks.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePairBot}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
                >
                  <span className="font-medium">Pair Bot</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions & Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Quick Access to Pair Bot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:border-purple-200 transition-all cursor-pointer"
            onClick={handlePairBot}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Bot className="text-white" size={24} />
              </div>
              <ArrowRight className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Pair Bot</h3>
            <p className="text-gray-600 text-sm">
              Connect and configure your automation bot
            </p>
          </motion.div>

          {/* Account Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-green-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <CheckCircle className="text-white" size={24} />
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Verified
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Account Status</h3>
            <p className="text-gray-600 text-sm">
              Your account is verified and active
            </p>
          </motion.div>

          {/* Activity Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-blue-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <Zap className="text-white" size={24} />
              </div>
              <Clock className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Activity</h3>
            <p className="text-gray-600 text-sm">
              Monitor your bot's performance and logs
            </p>
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Calendar className="mr-2 text-purple-600" size={24} />
              Recent Activity
            </h2>
            <span className="text-sm text-gray-500">{getCurrentTime()}</span>
          </div>

          {botStatus.isLinked ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Bot connected successfully</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Configuration updated</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg font-medium mb-2">No Activity Yet</p>
              <p className="text-gray-400 text-sm mb-6">
                Connect your bot to start seeing activity logs here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePairBot}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
              >
                <Bot size={18} />
                <span className="font-medium">Get Started</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default UserDashboard;