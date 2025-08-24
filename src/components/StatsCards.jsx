import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp,
  Activity
} from 'lucide-react';

const StatsCards = ({ dashboardData }) => {
  const statsData = [
    {
      title: 'Total Users',
      value: dashboardData.totalUsers,
      icon: Users,
      color: 'purple',
      borderColor: 'border-purple-600',
      bgGradient: 'from-purple-500 to-purple-600',
      subText: 'Users registered',
      subIcon: TrendingUp,
      subColor: 'text-green-600',
      delay: 0.1
    },
    {
      title: 'Linked Users',
      value: dashboardData.linked,
      icon: UserCheck,
      color: 'green',
      borderColor: 'border-green-500',
      bgGradient: 'from-green-500 to-green-600',
      subText: 'Account Linked',
      subIcon: UserCheck,
      subColor: 'text-green-600',
      delay: 0.2
    },
    {
      title: 'Pending Linking',
      value: dashboardData.notLinked,
      icon: UserX,
      color: 'orange',
      borderColor: 'border-orange-500',
      bgGradient: 'from-orange-500 to-orange-600',
      subText: 'Awaiting Linking',
      subIcon: Activity,
      subColor: 'text-orange-600',
      delay: 0.3
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        const SubIconComponent = stat.subIcon;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${stat.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {stat.value.toLocaleString()}
                </p>
                <p className={`text-sm ${stat.subColor} flex items-center mt-2`}>
                  <SubIconComponent size={16} className="mr-1" />
                  {stat.subText}
                </p>
              </div>
              <div className={`bg-gradient-to-r ${stat.bgGradient} p-4 rounded-xl`}>
                <IconComponent size={32} className="text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;