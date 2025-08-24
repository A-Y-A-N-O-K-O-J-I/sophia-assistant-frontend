import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const UserChart = ({ dashboardData }) => {
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

  return (
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
  );
};

export default UserChart;