// pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Bot, Zap, Shield, Users, Code, Smartphone } from 'lucide-react';

const AboutPage = () => {
  const advantages = [
    {
      icon: <Bot className="text-purple-600" size={32} />,
      title: "Advanced AI Engine",
      description: "Powered by sophisticated natural language processing for human-like conversations"
    },
    {
      icon: <Zap className="text-purple-600" size={32} />,
      title: "Lightning Fast",
      description: "Instant responses and real-time automation with 99.9% uptime guarantee"
    },
    {
      icon: <Shield className="text-purple-600" size={32} />,
      title: "Privacy First",
      description: "End-to-end encryption and complete data privacy - your conversations stay yours"
    },
    {
      icon: <Users className="text-purple-600" size={32} />,
      title: "Group Intelligence",
      description: "Smart group management with AI-powered moderation and engagement tools"
    },
    {
      icon: <Code className="text-purple-600" size={32} />,
      title: "Baileys Integration",
      description: "Built on the most reliable WhatsApp Web API for seamless connectivity"
    },
    {
      icon: <Smartphone className="text-purple-600" size={32} />,
      title: "Multi-Device Support",
      description: "Works across all your devices with synchronized settings and preferences"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Link Your Device",
      description: "Connect Sophia through WhatsApp's linked devices feature using our secure Baileys integration"
    },
    {
      step: "02", 
      title: "Send Your Email",
      description: "Provide your email address to our team for personalized AI setup and configuration"
    },
    {
      step: "03",
      title: "AI Activation",
      description: "Our experts configure and deploy your personal Sophia Assistant within 24 hours"
    },
    {
      step: "04",
      title: "Start Automating",
      description: "Begin enjoying advanced WhatsApp automation with your new digital companion"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-purple-600">Sophia Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary AI technology that transforms your WhatsApp experience into a smart, automated digital ecosystem
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">The Future of WhatsApp Automation</h2>
              <p className="text-gray-600 mb-6">
                Unlike basic chatbots like Meta AI or ChatGPT that handle simple tasks, Sophia Assistant is a comprehensive digital companion built specifically for WhatsApp power users.
              </p>
              <p className="text-gray-600 mb-6">
                Using advanced Baileys integration, Sophia seamlessly connects to your WhatsApp through linked devices, providing enterprise-grade automation while maintaining complete privacy and control.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500" size={20} />
                  <span>Advanced AI conversation engine</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500" size={20} />
                  <span>Complete media download capabilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500" size={20} />
                  <span>Professional group management tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="text-green-500" size={20} />
                  <span>Enterprise-level security and privacy</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">What Makes Sophia Different?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
                  <p className="text-purple-100">Goes beyond basic Q&A to provide true automation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
                  <p className="text-purple-100">Downloads any media content - videos, music, anime, movies</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
                  <p className="text-purple-100">Adapts communication tone based on your preferences</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
                  <p className="text-purple-100">Manages groups with games, tagging, and moderation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-3"></div>
                  <p className="text-purple-100">Unlocks view-once messages and blocks unwanted users</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How It <span className="text-purple-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600">Simple setup process to get your AI assistant running</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-purple-200 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
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
              Why <span className="text-purple-600">Thousands</span> Trust Sophia
            </h2>
            <p className="text-xl text-gray-600">Built with cutting-edge technology for the ultimate WhatsApp experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-4">{advantage.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-purple-100 mb-8">
              To revolutionize how people interact with WhatsApp by providing intelligent automation 
              that feels natural, respects privacy, and enhances daily communication experiences.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-left">
              <blockquote className="text-lg text-white italic">
                "Sophia Assistant isn't just another chatbot - it's your digital companion that understands 
                context, learns your preferences, and becomes an extension of your digital personality."
              </blockquote>
              <cite className="text-purple-200 mt-4 block">- The Sophia Development Team</cite>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;