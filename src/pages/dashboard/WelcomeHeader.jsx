import React from 'react';
import { motion } from 'framer-motion';

const WelcomeHeader = ({ userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
        Welcome back, {userName.split(' ')[0]}! 👋
      </h1>
      <p className="text-gray-600">
        Here's your bot status and quick actions for today.
      </p>
    </motion.div>
  );
};

export default WelcomeHeader;