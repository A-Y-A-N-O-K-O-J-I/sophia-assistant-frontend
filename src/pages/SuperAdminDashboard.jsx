import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Plus,
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import SuperAdminSidebar from '../components/SuperAdminNavbar';
const SuperAdminDashboard = () => {
  const navigate = useNavigate(0)
  const [dashboardData, setDashboardData] = useState({
    verified: 0,
    notVerified: 0,
    totalUsers: 0,
    firstThreeAdmins: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/super-admin/dashboard`, {
          method: 'GET',
          headers: {
            'authorization':`Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json',
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

  // Prepare pie chart data
  const pieChartData = [
    {
      name: 'Verified Admins',
      value: dashboardData.verified,
      color: '#8b5cf6'
    },
    {
      name: 'Not Verified Admins',
      value: dashboardData.notVerified,
      color: '#a78bfa'
    }
  ];

  const handleAddAdmin = () => {
   navigate("/super-admin/add-admin")
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
    <SuperAdminSidebar />
    <div className="lg:ml-20 min-h-screen bg-gray-50">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            Super Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your platform today.
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
                  Active platform users
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
                <p className="text-sm font-medium text-gray-600 mb-1">Verified Admins</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData.verified.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 flex items-center mt-2">
                  <Shield size={16} className="mr-1" />
                  Account verified
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl">
                <UserCheck size={32} className="text-white" />
              </div>
            </div>
          </motion.div>

          {/* Not Verified Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Verification</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData.notVerified.toLocaleString()}
                </p>
                <p className="text-sm text-orange-600 flex items-center mt-2">
                  <Activity size={16} className="mr-1" />
                  Awaiting verification
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl">
                <UserX size={32} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts and Admin Section */}
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
              Admin Verification Status
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

          {/* Admins Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <UserCheck className="mr-2 text-purple-600" size={24} />
                Recent Admins
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddAdmin}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg"
              >
                <Plus size={16} />
                <span className="font-medium">Add Admin</span>
              </motion.button>
            </div>

            <div className="space-y-4">
              {dashboardData.firstThreeAdmins && dashboardData.firstThreeAdmins.length > 0 ? (
                dashboardData.firstThreeAdmins.map((admin, index) => (
                  <motion.div
                    key={admin.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-25 rounded-xl border border-purple-100 hover:border-purple-200 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {admin.name || 'Admin User'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {admin.email || 'admin@example.com'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        admin.isActive !== false 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {admin.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <UserCheck size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 text-lg font-medium mb-2">No Admins Yet</p>
                  <p className="text-gray-400 text-sm mb-6">
                    Start by adding your first admin to help manage the platform.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddAdmin}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
                  >
                    <Plus size={18} />
                    <span className="font-medium">Add Your First Admin</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
                    </>
  );
};

export default SuperAdminDashboard;