import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Key,
  Copy,
  CheckCircle,
  Plus,
  TrendingUp,
  Activity,
  RefreshCw
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import AdminSidebar from '../components/AdminNavbar';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin User', // This would come from auth/context
    email: 'admin@example.com'
  });
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    linked: 0,
    notLinked: 0,
    recentUsers: []
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch admin dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/admin/dashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          },
          credentials:"include"
        });

        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
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

  // Generate admin code
  const handleGenerateCode = async () => {
    try {
      setGenerating(true);
      const response = await fetch(`${API_URL}/admin/generate-admin-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        credentials:"include"
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

  // Prepare pie chart data
  const pieChartData = [
    {
      name: 'Linked Users',
      value: dashboardData.linked,
      color: '#8b5cf6'
    },
    {
      name: 'Not Linked Users',
      value: dashboardData.notLinked,
      color: '#a78bfa'
    }
  ];

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
    <AdminSidebar />
    <div className="lg:ml-20 min-h-screen bg-gray-50">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {adminInfo.name.split(' ')[0]}! Manage your users and admin codes.
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Total Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData.totalUsers.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <TrendingUp size={16} className="mr-1" />
                  Users registered
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl">
                <Users size={32} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Verified Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Linked Users</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData.linked.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <UserCheck size={16} className="mr-1" />
                  Account Linked
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl">
                <UserCheck size={32} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Unverified Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Linking</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData.notLinked.toLocaleString()}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-2">
                  <Activity size={16} className="mr-1" />
                  Awaiting Linking
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl">
                <UserX size={32} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chart and Admin Code Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Activity className="mr-2 text-purple-600" size={24} />
              User Verification Overview
            </h2>
            
            {dashboardData.totalUsers > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [value.toLocaleString(), '']}
                      labelStyle={{ color: '#374151' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Users size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No user data available</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Admin Code Generator */}
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
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Generate secure admin codes for new user registrations
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerateCode}
                  disabled={generating}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto disabled:opacity-70"
                >
                  {generating ? (
                    <RefreshCw size={18} className="animate-spin" />
                  ) : (
                    <Plus size={18} />
                  )}
                  <span className="font-medium">
                    {generating ? 'Generating...' : 'Generate Code'}
                  </span>
                </motion.button>
              </div>

              {generatedCode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-50 to-purple-25 p-6 rounded-xl border border-purple-200"
                >
                  <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Generated Admin Code</p>
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
                    Share this code with users to allow them to register under your admin account
                  </p>
                </motion.div>
              )}

              {!generatedCode && (
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <Key size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-medium mb-2">No Code Generated</p>
                  <p className="text-gray-400 text-sm">
                    Click the button above to generate a new admin code
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Users Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Users className="mr-2 text-purple-600" size={24} />
            Recent User Registrations
          </h2>

          {dashboardData.recentUsers && dashboardData.recentUsers.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentUsers.map((user, index) => (
                <motion.div
                  key={user.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-25 rounded-xl border border-purple-100 hover:border-purple-200 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {user.name || 'User'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {user.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isVerified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {user.createdAt || 'Recently joined'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg font-medium mb-2">No Users Yet</p>
              <p className="text-gray-400 text-sm mb-6">
                Users who register with your admin code will appear here.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGenerateCode}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
              >
                <Key size={18} />
                <span className="font-medium">Generate Your First Code</span>
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
</>
  );
};

export default AdminDashboard;