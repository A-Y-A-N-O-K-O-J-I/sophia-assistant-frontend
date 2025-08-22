// pages/FAQPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MessageCircle, Shield, Zap, Settings } from 'lucide-react';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqCategories = [
    {
      title: "General Questions",
      icon: <MessageCircle className="text-purple-600" size={24} />,
      faqs: [
        {
          question: "What is Sophia Assistant?",
          answer: "Sophia Assistant is a premium-grade WhatsApp automation bot that works as your personal AI agent. Unlike basic chatbots, Sophia can download media, manage groups, create games, automate responses, and interact with you like a true digital companion."
        },
        {
          question: "How is Sophia different from Meta AI or ChatGPT?", 
          answer: "While Meta AI and ChatGPT handle basic tasks like web search or creating PDFs, Sophia offers comprehensive WhatsApp automation including media downloads (videos, music, anime, movies), group management, tone adaptation, view-once message unlocking, user blocking, scheduling, and much more."
        },
        {
          question: "What does 'premium-grade' mean?",
          answer: "Premium-grade means Sophia offers enterprise-level features, 99.9% uptime, 24/7 support, advanced AI conversations, complete privacy controls, and professional deployment with ongoing maintenance and updates."
        }
      ]
    },
    {
      title: "Setup & Technical",
      icon: <Settings className="text-blue-600" size={24} />,
      faqs: [
        {
          question: "How does the setup process work?",
          answer: "Setup is simple: 1) Link Sophia to your WhatsApp via linked devices using Baileys, 2) Send your email address to our team, 3) We create and configure your AI within 24 hours, 4) Start using your personal Sophia Assistant!"
        },
        {
          question: "What is Baileys and why do you use it?",
          answer: "Baileys is the most reliable and secure WhatsApp Web API library. It allows Sophia to connect to your WhatsApp through the official linked devices feature, ensuring maximum compatibility, security, and functionality."
        },
        {
          question: "How many WhatsApp numbers do I need?",
          answer: "Lite plan requires 1 number (your main account). Basic and Pro plans require 2 numbers - your main account plus one additional number for enhanced functionality and backup purposes."
        },
        {
          question: "Is my data safe and private?",
          answer: "Absolutely. Sophia uses end-to-end encryption, never stores your personal conversations, and all data processing happens securely. Your privacy is our top priority and we follow strict data protection protocols."
        }
      ]
    },
    {
      title: "Plans & Features",
      icon: <Zap className="text-green-600" size={24} />,
      faqs: [
        {
          question: "Which plan should I choose?",
          answer: "Lite (₦2,600) is perfect for personal use with basic AI companion features. Basic (₦5,000) adds automation and dual-number support for small businesses. Pro (₦10,000) offers full integration with advanced business tools and multi-user support."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Yes! You can change your plan at any time. Contact our support team and we'll help you transition seamlessly. Pro-rated billing applies for plan changes."
        },
        {
          question: "What media can Sophia download?",
          answer: "Sophia can download videos, music, documents, anime, movies, TikTok videos, Instagram content, YouTube videos, and virtually any media content from supported platforms."
        },
        {
          question: "How does the tone adaptation work?",
          answer: "Sophia learns from your communication patterns and can adapt her responses to match your preferred tone - formal, casual, friendly, professional, or any custom style you prefer."
        }
      ]
    },
    {
      title: "Billing & Support", 
      icon: <Shield className="text-red-600" size={24} />,
      faqs: [
        {
          question: "How does billing work?",
          answer: "All plans are billed monthly. Payment is processed securely and you'll receive confirmation via email. Your Sophia Assistant remains active as long as your subscription is current."
        },
        {
          question: "What happens if I cancel?",
          answer: "You can cancel anytime. Sophia will remain active until the end of your current billing period, after which the service will be deactivated. All your settings and preferences are saved for 30 days in case you decide to reactivate."
        },
        {
          question: "Do you offer customer support?",
          answer: "Yes! All plans include customer support. Basic and Lite plans get standard support, while Pro plan users enjoy priority 24/7 support with dedicated assistance."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 7-day money-back guarantee if you're not satisfied with Sophia Assistant. Contact our support team within 7 days of activation for a full refund."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
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
              Frequently Asked <span className="text-purple-600">Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about Sophia Assistant
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center mb-8">
                  {category.icon}
                  <h2 className="text-2xl font-bold ml-3">{category.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const isOpen = openFAQ === `${categoryIndex}-${faqIndex}`;
                    
                    return (
                      <motion.div
                        key={faqIndex}
                        className="bg-gray-50 rounded-xl overflow-hidden"
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                        >
                          <span className="text-lg font-semibold text-gray-900">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="text-gray-500" size={20} />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Our support team is here to help you get the most out of Sophia Assistant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open('https://wa.me/2348073765008?text=I have some questions about Sophia Assistant', '_blank')}
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-2" size={20} />
                Ask on WhatsApp
              </motion.button>
              <motion.button
                onClick={() => window.open('https://wa.me/2348073765008?text=I\'d like to schedule a demo of Sophia Assistant', '_blank')}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;