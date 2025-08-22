// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bot, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Sophia Assistant
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === item.id 
                    ? 'text-purple-600' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.label}
              </motion.button>
            ))}
            
            {/* Access Webpage Button */}
            <motion.button
              onClick={() => navigate('/auth')} // Replace with actual webpage URL
              className="flex items-center space-x-2 border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={18} />
              <span>Access Webpage</span>
            </motion.button>

            {/* Get Started Button */}
            <motion.button
              onClick={() => window.open('https://wa.me/2348073765008?text=I\'d like to get Admin code for the Sophia Assistant login', '_blank')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left font-medium transition-colors duration-200 ${
                      currentPage === item.id 
                        ? 'text-purple-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => navigate("/auth")} // Replace with actual webpage URL
                  className="flex items-center space-x-2 w-full border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-full font-medium justify-center"
                >
                  <Globe size={18} />
                  <span>Access Webpage</span>
                </button>
                <button
                  onClick={() => window.open('https://wa.me/2348073765008?text=I\'d like to get Admin code for the Sophia Assistant login', '_blank')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-2 rounded-full font-medium"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;