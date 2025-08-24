import React from 'react';
import { motion } from 'framer-motion';
import { Users, Key } from 'lucide-react';

const RecentUsers = ({ dashboardData }) => {
  const handleGenerateFirstCode = () => {
    // This could trigger the code generator or scroll to it
    const codeGenerator = document.querySelector('[data-component="admin-code-generator"]');
    if (codeGenerator) {
      codeGenerator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 bg-white rounded-xl shadow-lg p-6"
      data-component="recent-users"
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
                  {user.plan && (
                    <p className="text-xs text-purple-600 font-medium">
                      {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.isVerified || user.linked
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {user.isVerified || user.linked ? 'Linked' : 'Pending'}
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
            onClick={handleGenerateFirstCode}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg mx-auto"
          >
            <Key size={18} />
            <span className="font-medium">Generate Your First Code</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default RecentUsers;