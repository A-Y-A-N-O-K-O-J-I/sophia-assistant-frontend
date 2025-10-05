import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Bot, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      name: 'Home',
      icon: Home,
      route: '/dashboard',
      path: '/dashboard'
    },
    {
      name: 'Pair Bot',
      icon: Bot,
      route: '/pair-bot',
      path: '/pair-bot'
    },
    {
      name: 'Edit Info',
      icon: Settings,
      route: '/edit-info',
      path: '/edit-info'
    }
  ];

  const handleNavigation = (route, path) => {
    setActiveRoute(route);
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    // Handle logout logic
    window.location.href = '/logout';
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button - Fixed position */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>

      {/* Desktop Sidebar - Always visible icons only */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 shadow-2xl z-40">
        <div className="flex flex-col h-full">
          {/* Logo/Brand area */}
          <div className="h-20 flex items-center justify-center border-b border-purple-600">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
            >
              <span className="text-purple-800 font-bold text-lg">U</span>
            </motion.div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              return (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.route, item.path)}
                  className={`w-full p-4 flex items-center justify-center mb-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-500 bg-opacity-20 border-r-4 border-purple-500'
                      : 'hover:bg-purple-500 hover:bg-opacity-10'
                  }`}
                >
                  <Icon 
                    size={24} 
                    className={`${
                      isActive ? 'text-white' : 'text-purple-200'
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-purple-600">
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-center hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-300"
            >
              <LogOut size={24} className="text-purple-200 hover:text-red-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Mobile/Tablet Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 shadow-2xl z-40"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-purple-600">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-800 font-bold text-xl">U</span>
                  </div>
                  <h2 className="text-white text-xl font-bold">User Panel</h2>
                  <p className="text-purple-200 text-sm">Manage your account</p>
                </motion.div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-6 px-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeRoute === item.route;
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(item.route, item.path)}
                      className={`w-full p-4 flex items-center space-x-4 rounded-xl mb-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-500 bg-opacity-20 text-white border-l-4 border-purple-500'
                          : 'text-purple-200 hover:bg-purple-500 hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-lg font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="p-4 border-t border-purple-600">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full p-4 flex items-center space-x-4 rounded-xl hover:bg-red-500 hover:bg-opacity-20 text-purple-200 hover:text-red-300 transition-all duration-300"
                >
                  <LogOut size={24} />
                  <span className="text-lg font-medium">Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Expanded Sidebar on Hover/Click */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 80, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 shadow-2xl z-35"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="h-20 flex items-center px-6 border-b border-purple-600">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-purple-800 font-bold text-lg">U</span>
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-bold">User Panel</h2>
                    <p className="text-purple-200 text-xs">Your Dashboard</p>
                  </div>
                </motion.div>
              </div>

              {/* Menu Items */}
              <div className="flex-1 py-8 px-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeRoute === item.route;
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation(item.route, item.path)}
                      className={`w-full p-3 flex items-center space-x-3 rounded-xl mb-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-500 bg-opacity-20 text-white border-l-4 border-purple-500'
                          : 'text-purple-200 hover:bg-purple-500 hover:bg-opacity-10 hover:text-white'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="p-4 border-t border-purple-600">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full p-3 flex items-center space-x-3 rounded-xl hover:bg-red-500 hover:bg-opacity-20 text-purple-200 hover:text-red-300 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserSidebar;