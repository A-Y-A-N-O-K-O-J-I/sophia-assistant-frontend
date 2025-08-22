// pages/HomePage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageCircle, Download, Users, Settings, Shield, Zap, ArrowRight, Check } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <MessageCircle className="text-purple-600" size={24} />,
      title: "Smart Conversations",
      description: "AI-powered chat companion that adapts to your communication style"
    },
    {
      icon: <Download className="text-purple-600" size={24} />,
      title: "Media Downloads",
      description: "Download videos, music, anime, movies, and TikTok content instantly"
    },
    {
      icon: <Users className="text-purple-600" size={24} />,
      title: "Group Management",
      description: "Create games, tag members, antilink protection, and advanced moderation"
    },
    {
      icon: <Settings className="text-purple-600" size={24} />,
      title: "Automation Tools",
      description: "Schedule messages, auto-replies, reminders, and workflow automation"
    },
    {
      icon: <Shield className="text-purple-600" size={24} />,
      title: "Privacy Controls",
      description: "Block users, unlock view-once messages, and maintain complete privacy"
    },
    {
      icon: <Zap className="text-purple-600" size={24} />,
      title: "Instant Setup",
      description: "Quick deployment via Baileys with professional support"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
    { number: "50+", label: "Features" },
    { number: "1000+", label: "Happy Users" }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Sophia Assistant
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                The most advanced WhatsApp AI automation bot that works like your personal digital companion
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.button
                  onClick={() => window.open('https://wa.me/2348073765008?text=I\'d like to get Admin code for the Sophia Assistant login', '_blank')}
                  className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Admin Code <ArrowRight className="ml-2" size={20} />
                </motion.button>
                {/* <motion.button
                  className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo
                </motion.button> */}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Bot className="text-purple-600" size={24} />
                      <div className="bg-purple-100 rounded-lg px-4 py-2 flex-1">
                        <p className="text-sm text-purple-800">Sophia is now active on your WhatsApp! 🚀</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2 flex-1">
                        <p className="text-sm text-gray-700">Sophia, download this video for me</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bot className="text-purple-600" size={24} />
                      <div className="bg-purple-100 rounded-lg px-4 py-2 flex-1">
                        <p className="text-sm text-purple-800">✅ Video downloaded successfully!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.h3 
                  className="text-4xl font-bold text-purple-600 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="text-purple-600">Sophia?</span>
            </h2>
            <p className="text-xl text-gray-600">Beyond basic automation - your complete WhatsApp AI companion</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your WhatsApp?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of users who have already upgraded their messaging experience
            </p>
            <motion.button
              onClick={() => window.open('https://wa.me/2348073765008?text=I\'d like to get Admin code for the Sophia Assistant login', '_blank')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Admin Code Now <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;