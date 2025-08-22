// pages/ContactPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, Users, Headphones, ArrowRight, Bot, Zap } from 'lucide-react';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <MessageCircle className="text-green-600" size={32} />,
      title: "WhatsApp Support",
      description: "Get instant help from our support team",
      action: "Chat Now",
      link: "https://wa.me/2348073765008?text=I need support with Sophia Assistant",
      color: "green"
    },
    {
      icon: <Bot className="text-purple-600" size={32} />,
      title: "Get Admin Code",
      description: "Ready to start? Get your admin code instantly",
      action: "Get Code",
      link: "https://wa.me/2348073765008?text=I'd like to get admin code",
      color: "purple"
    },
    {
      icon: <Users className="text-blue-600" size={32} />,
      title: "Schedule Demo",
      description: "See Sophia in action with a live demonstration",
      action: "Book Demo",
      link: "https://wa.me/2348073765008?text=I'd like to schedule a demo",
      color: "blue"
    },
    {
      icon: <Headphones className="text-red-600" size={32} />,
      title: "Technical Support",
      description: "Need help with setup or troubleshooting?",
      action: "Get Help",
      link: "https://wa.me/2348073765008?text=I need technical support",
      color: "red"
    }
  ];

  const supportFeatures = [
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "24/7 Availability",
      description: "Our support team is available around the clock for Pro users, with standard hours for other plans"
    },
    {
      icon: <Zap className="text-purple-600" size={24} />,
      title: "Quick Response",
      description: "Average response time under 2 hours for all support inquiries"
    },
    {
      icon: <Users className="text-purple-600" size={24} />,
      title: "Expert Team", 
      description: "Our support staff are Sophia experts who know the platform inside and out"
    }
  ];

  const getButtonColors = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-600 hover:bg-green-700';
      case 'purple':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'blue':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'red':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="text-purple-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ready to transform your WhatsApp experience? Our team is here to help you get started
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-left max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Get personalized plan recommendations</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>See live demo of Sophia's capabilities</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Quick setup assistance and onboarding</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Technical support and troubleshooting</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Choose Your <span className="text-purple-600">Contact Method</span>
            </h2>
            <p className="text-xl text-gray-600">We're here to help however you prefer to communicate</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="mb-4">{method.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <motion.button
                  onClick={() => window.open(method.link, '_blank')}
                  className={`w-full text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${getButtonColors(method.color)}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {method.action} <ArrowRight className="ml-2" size={16} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Premium <span className="text-purple-600">Support Experience</span>
            </h2>
            <p className="text-xl text-gray-600">We're committed to your success with Sophia Assistant</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 lg:p-12 text-white text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of users who have already upgraded their WhatsApp experience
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Quick Contact Info</h3>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center">
                  <MessageCircle className="mr-3" size={20} />
                  <span>WhatsApp: +234 807 376 5008</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-3" size={20} />
                  <span>Response Time: Under 2 hours</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-3" size={20} />
                  <span>Support: 24/7 for Pro users</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('https://wa.me/2348073765008?text=I\'d like to get admin code', '_blank')}
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Admin Code <ArrowRight className="ml-2" size={20} />
              </motion.button>
              <motion.button
                onClick={() => window.open('https://wa.me/2348073765008?text=I have questions about Sophia Assistant', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ask Questions
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;