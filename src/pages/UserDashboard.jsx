import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Components
import UserSidebar from "../components/UserNavbar";
import WelcomeHeader from "./dashboard/WelcomeHeader";
import BotStatusCard from "./dashboard/BotStatusCard";
import QuickActionsGrid from "./dashboard/QuickActionGrid";
import RecentActivity from "./dashboard/RecentActivity";

// Custom Hook
import { useDashboardData } from "../hooks/useDashboardData";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { userInfo, botStatus, premiumBotStatus, loading, error, setError } =
    useDashboardData();

  const handlePairBot = () => {
    navigate("/pair-bot");
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
          <WelcomeHeader userName={userInfo.name} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800"
            >
              {error}
            </motion.div>
          )}
          <div className="flex justify-center items-center pb-5 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-6 inline-block px-6 py-3 bg-gradient-to-r ${userInfo.plan === "premium" ? "from-yellow-500 to-yellow-600" : userInfo.plan ==="basic" ? "from-blue-500 to-green-400" : "from-gray-300 to-gray-500"}  text-white rounded-full font-semibold shadow-lg`}
          >
             {userInfo.plan === "premium" ? "👑 Premium" : userInfo.plan ==="basic" ? "⚡ Basic" : "🌱 Lite"} Account
          </motion.div>

          </div>
          <BotStatusCard
            botStatus={botStatus}
            onPairBot={handlePairBot}
            label="Main Bot Status"
          />

          {userInfo.isPremium && (
            <BotStatusCard
              botStatus={premiumBotStatus}
              onPairBot={handlePairBot}
              label="Premium Bot Status"
            />
          )}

          <QuickActionsGrid onPairBot={handlePairBot} />

          <RecentActivity
            botStatus={botStatus}
            onPairBot={handlePairBot}
            label="Main Bot Activity"
          />

          {userInfo.isPremium && (
            <RecentActivity
              botStatus={premiumBotStatus}
              onPairBot={handlePairBot}
              label="Premium Bot Activity"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
