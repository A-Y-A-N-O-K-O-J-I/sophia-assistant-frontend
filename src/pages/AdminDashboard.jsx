import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminSidebar from '../components/AdminNavbar';
import AdminHeader from '../components/AdminHeader';
import StatsCards from '../components/StatsCards';
import UserChart from '../components/UserChart';
import AdminCodeGenerator from '../components/AdminCodeGenerator';
import RecentUsers from '../components/RecentUsers';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin User',
    email: 'admin@example.com'
  });
  
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    linked: 0,
    notLinked: 0,
    recentUsers: []
  });
  
  const [loading, setLoading] = useState(true);
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
            'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
          },
          credentials: "include"
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
          <AdminHeader adminInfo={adminInfo} error={error} setError={setError} />
          <StatsCards dashboardData={dashboardData} />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <UserChart dashboardData={dashboardData} />
            <AdminCodeGenerator />
          </div>
          
          <RecentUsers dashboardData={dashboardData} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;