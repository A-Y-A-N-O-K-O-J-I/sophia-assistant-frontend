// pages/PricingPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Bot, Users, Zap } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    {
      name: "Lite",
      price: "₦2,600",
      period: "/month",
      description: "Perfect for personal use - your private AI companion",
      icon: <Bot className="text-blue-600" size={32} />,
      color: "blue",
      numbers: "1 Number Required",
      popular: false,
      whatsappText: "I'd like to get admin code for Lite plan",
      features: [
        "Personal AI companion (chat & Q&A)",
        "Responds only to direct commands",
        "Fetches media & files (music, videos, docs, anime, movies)", 
        "Minimal, private setup - just you & your bot",
        "Basic download capabilities",
        "Simple voice interactions"
      ]
    },
    {
      name: "Basic", 
      price: "₦5,000",
      period: "/month",
      description: "Enhanced automation for busy individuals and small businesses",
      icon: <Users className="text-purple-600" size={32} />,
      color: "purple",
      numbers: "2 Numbers Required", 
      popular: true,
      whatsappText: "I'd like to get admin code for Basic plan",
      features: [
        "Everything in Lite ✅",
        "Smart reminders & notes",
        "Auto-replies when you're busy", 
        "Scheduled messages",
        "Background automations (quick replies, busy mode)",
        "Cloud storage integration (Google Drive, etc.)",
        "Dual number support",
        "Enhanced media processing"
      ]
    },
    {
      name: "Pro",
      price: "₦10,000", 
      period: "/month",
      description: "Full-powered AI assistant for power users and businesses",
      icon: <Zap className="text-gold-600" size={32} />,
      color: "gradient",
      numbers: "2 Numbers Required",
      popular: false,
      whatsappText: "I'd like to get admin code for Pro plan",
      features: [
        "Everything in Basic ✅",
        "Conversational AI mode (chat freely like Meta AI)",
        "Full WhatsApp integration (send, receive, manage chats)",
        "Status updates (auto-post, schedule, delete)",
        "Large file uploads & downloads", 
        "External API connections (news, weather, data)",
        "Advanced business tools (support, analytics)",
        "Multi-user / multi-number support",
        "Database logging & insights",
        "Priority 24/7 support"
      ]
    }
  ];

  const getButtonColors = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900';
      case 'purple':
        return 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900';
      case 'gradient':
        return 'bg-gradient-to-r from-yellow-500 via-purple-600 to-blue-600 hover:from-yellow-600 hover:via-purple-700 hover:to-blue-700';
      default:
        return 'bg-gradient-to-r from-purple-600 to-purple-800';
    }
  };

  const getCardColors = (color, popular) => {
    if (popular) {
      return 'ring-2 ring-purple-500 shadow-2xl transform scale-105';
    }
    switch (color) {
      case 'blue':
        return 'border border-blue-200 hover:border-blue-300';
      case 'purple':
        return 'border border-purple-200 hover:border-purple-300';
      case 'gradient':
        return 'border border-yellow-200 hover:border-yellow-300';
      default:
        return 'border border-gray-200 hover:border-gray-300';
    }
  };

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
              Choose Your <span className="text-purple-600">Plan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing for every need - from personal companion to enterprise automation
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-white rounded-3xl p-8 relative transition-all duration-300 ${getCardColors(plan.color, plan.popular)}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star size={16} className="mr-1" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">{plan.numbers}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => window.open(`https://wa.me/2348073765008?text=${encodeURIComponent(plan.whatsappText)}`, '_blank')}
                  className={`w-full text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${getButtonColors(plan.color)}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get {plan.name} Plan <ArrowRight className="ml-2" size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Comparison */}
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
              Plan <span className="text-purple-600">Breakdown</span>
            </h2>
            <p className="text-xl text-gray-600">Understand exactly what each plan offers</p>
          </motion.div>

          <div className="space-y-8">
            {/* Lite Plan Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8"
            >
              <div className="flex items-center mb-4">
                <Bot className="text-blue-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-blue-900">Lite - Personal Companion</h3>
              </div>
              <p className="text-blue-800 mb-4">
                The most stripped-down version, meant for someone who just wants a companion bot on WhatsApp. 
                Sophia only responds to direct commands — you have to call her name or use a trigger. 
                She doesn't touch your chats on her own.
              </p>
              <p className="text-blue-700 font-medium">
                Perfect for: Personal use, students, basic automation needs
              </p>
            </motion.div>

            {/* Basic Plan Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8"
            >
              <div className="flex items-center mb-4">
                <Users className="text-purple-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-purple-900">Basic - Smart Automation</h3>
              </div>
              <p className="text-purple-800 mb-4">
                Sophia not only responds to direct commands but can also handle background automations. 
                Auto-reply to messages when you're busy, schedule messages, set reminders, and manage files. 
                Good for small businesses, students, or anyone needing light automation.
              </p>
              <p className="text-purple-700 font-medium">
                Perfect for: Small businesses, busy professionals, content creators
              </p>
            </motion.div>

            {/* Pro Plan Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-yellow-50 via-purple-50 to-blue-50 rounded-2xl p-8"
            >
              <div className="flex items-center mb-4">
                <Zap className="text-yellow-600 mr-3" size={32} />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Pro - Full Powerhouse
                </h3>
              </div>
              <p className="text-gray-800 mb-4">
                The full powerhouse where Sophia really feels alive inside WhatsApp. Full integration: 
                send/receive messages on your behalf, act as conversational partner, manage status updates, 
                connect to external APIs, and transform into a true digital assistant with agency.
              </p>
              <p className="text-gray-700 font-medium">
                Perfect for: Enterprises, power users, businesses, content managers
              </p>
            </motion.div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Choose your plan and get your admin code in minutes
            </p>
            <motion.button
              onClick={() => window.open('https://wa.me/2348073765008?text=I need help choosing the right plan for me', '_blank')}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Need Help Choosing? <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;